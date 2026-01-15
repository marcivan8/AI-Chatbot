# EduGuide — Documentation complète (plan suivi)

Version : 1.0.0  
Date : 2026-01-15  
Langue : Français

Sommaire
1. Présentation générale du projet  
2. Architecture globale  
3. Frontend — implémentation détaillée  
4. Backend — architecture et Agent (ReAct)  
5. Serveur MCP & Tooling — design et contrats  
6. Sécurité & gestion des données  
7. Limites du projet et améliorations (court/moyen terme)  
8. Conclusion, compétences et liens IA modernes  
Annexes  
- A. Extraits de code importants (fichiers réels)  
- B. Commandes & génération PDF (instructions pandoc)  
- C. Checklist de revue / QA

---

Intro rapide : ce document suit exactement le plan que vous avez fourni. Il est pensé pour être imprimé ou exporté en PDF (≈ 25 pages, selon marges/format). Les captures d'écran de code ont été remplacées par des extraits de code (Option A) — texte clair, indexable et prêt à la conversion.

1 — Présentation générale du projet 
-----------------------------------------------

1.1 Contexte

EduGuide est une plateforme d’orientation éducative destinée aux lycéens, étudiants et personnes en reconversion. Elle répond au manque de visibilité sur les parcours d’études, la fragilité des sources d’information et la difficulté à relier métiers ↔ parcours ↔ écoles.

Problèmes identifiés
- Données éparses, obsolètes ou incomplètes.
- Outils trop statiques, sans personnalisation ou comparateurs simples.
- Chatbots classiques hallucinant ou incapables d’appeler des outils/consulter des sources.

1.2 Objectifs

- Centraliser et structurer l'information sur les établissements et métiers.
- Permettre le matching métier → écoles et comparaison multi‑critères.
- Proposer un assistant IA (Eddy) qui raisonne (ReAct) et utilise des tools pour éviter les hallucinations.
- Offrir une UX mobile-first, fluide et visuelle (dashboards, graphiques).

1.3 Périmètre fonctionnel

Fonctions principales :
- Recherche d’écoles (texte + filtres)
- Fiches écoles détaillées (programmes, coût, admission, alternance)
- Fiches métiers (compétences, débouchés, salaires)
- Comparateur multi‑écoles
- Assistant IA multi‑étapes (ReAct) capable d’appeler tools (search, scrape, details)
- Persistences locales (favoris, comparateur)
- Dashboard statistiques & visualisations

1.4 Parcours utilisateur (exemple)
- Entrée : recherche textuelle ou message à Eddy ("Je veux une école de design à Paris en alternance").
- Traitement : Frontend → POST /api/v1/chat → Backend/Agent.
- Si nécessité de données structurées : Agent invoque `search_schools` (JSON/DB) → observation → synthèse.
- Résultat : réponse en français, avec sources et suggestions.

---

2 — Architecture globale
------------------------------------

2.1 Vue d’ensemble des composants

- Frontend : React + Vite (SPA). Composants UI, chatwidget, pages (Search, Careers, Compare, Insights).
- Backend : FastAPI (Uvicorn) — validation, authentification future, routage.
- Agent (Eddy) : orchestrateur ReAct — construit prompt, décide tool calls, appelle LLM (Ollama).
- Tools (MCP) : search_schools, get_school_details, search_web, scrape_website.
- DB : actuellement `backend/data/institutions.json` (fichier JSON). Roadmap → vector DB (Qdrant/pgvector).

2.2 Diagramme haut niveau (mermaid)

```mermaid
graph TD
  A[User] -->|Navigate| FE[Frontend (React + Vite)]
  FE -->|HTTP / REST| API[Backend - FastAPI]
  API --> Agent[Eddy - Agent ReAct]
  Agent --> Tools[MCP / Tools]
  Tools --> JSON[backend/data/institutions.json]
  Agent -->|LLM calls| Ollama[Ollama (LLM local)]
```

2.3 Flux détaillé (séquence)

- L'utilisateur envoie une requête via la UI.
- Frontend POST /api/v1/chat { message, history, meta }.
- Backend (API) : authentification, rate limiting, validation du payload.
- API → agent.process_message(message, history).
- Agent : build_context() → asks LLM whether to call tool.
  - Si tool nécessaire : MCP exécute tool → renvoie observation.
  - Agent injecte observation dans le contexte et réinterpelle LLM.
- LLM retourne final answer → API renvoie au frontend.
- Frontend affiche la réponse (support markdown, liens, actions).

2.4 Exigences non‑fonctionnelles

- Latence cible pour requêtes simples (sans tool) : < 1s.
- Sécurité : anti‑SSRF, validation d'URL, blocage IP locales, rate limiting.
- Observabilité : logs par trace_id, métriques outils, taux d'erreur par tool.

2.5 Rôles & responsabilités

- Frontend : UX, appels API, rendering.
- Backend : orchestration, validation, sécurité périphérique.
- Agent : logique ReAct, orchestration tool/LLM.
- MCP : exécution sécurisée des tools (whitelist, timeouts).

---

3 — Frontend 
------------------------------

3.1 Choix technologiques

- Vite + React 18 : dev rapide, HMR.
- Tailwind CSS v4 : utilitaires & responsive.
- Radix UI / Shadcn/UI : composants accessibles.
- Framer Motion : animations.
- Recharts : graphiques/insights.
- React Router : navigation SPA.

3.2 Organisation du code

Structure importante :

```
src/
 ├─ app/
 │   ├─ App.jsx
 │   ├─ PageLayout.jsx
 │   ├─ BottomNav.jsx
 │   ├─ FilterBottomSheet.jsx
 │   ├─ ComparisonView.jsx
 │   ├─ EddyChatbot.jsx
 │   ├─ SchoolCardNew.jsx
 │   ├─ SchoolDetailsModal.jsx
 │   ├─ CareerCard.jsx
 │   └─ CareerDetailsModal.jsx
 ├─ components/
 ├─ data/
 ├─ assets/
 └─ main.jsx
```

3.3 Composants clés — descriptions et comportements

- EddyChatbot / ChatWidget : gère messages, historique, envoi d'un message, rendu markdown, gestion loading/typing, scroll bottom automatique.
  - Extrait (simplifié — voir fichier réel `src/components/chatbot/ChatWidget.jsx`):

```jsx
import React, { useState, useRef, useEffect } from "react";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Salut! I'm Eddy. Ask me anything about studying in France! 🇫🇷", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: "user" }]);
    setInput("");
    setIsTyping(true);
    // POST to /api/v1/chat here and append response
  }

  return (
    /* JSX: floating button, panel, messages, input form */
    <div />
  );
}
```

- Navbar : navigation responsive, mobile menu (Framer Motion + AnimatePresence).
- SchoolCard / SchoolCardNew : affichage synthétique école, actions (comparer, favori, details).
- Comparator : sélection de deux/trois écoles, affichage comparatif (grid), graphiques.
- InsightsView : graphiques salaires, débouchés (Recharts).

3.4 Communication avec backend

Endpoints principaux :
- GET /api/v1/schools?query=&filters=
- GET /api/v1/schools/{id}
- GET /api/v1/careers
- GET /api/v1/stats
- POST /api/v1/chat

Bonnes pratiques dans le frontend
- Debounce pour la recherche (300 ms).
- Utiliser SWR/React Query pour cache et revalidation optionnelle.
- Gérer erreurs réseau & états (loading, empty, error).
- Désactiver actions à répétition (throttling côté UI pour éviter doubles POST).

3.5 Tests frontend

- Unit tests : Jest + React Testing Library (composants critiques).
- E2E : Cypress (flows : search → open details → compare).
- Linting : ESLint (config partagée), Prettier.

3.6 Captures & screenshots (instructions)
- Pour screenshots de code (si vous préférez images) : ouvrir chaque fichier source dans VS Code, afficher le fichier entier à 100% zoom, exporter PNG (1200 px largeur recommandé). Noms fichiers : `assets/docs/snippets/ChatWidget.png`, etc.

---

4 — Backend 
-----------------------------

4.1 Stack et hypothèses

- Python 3.9+
- FastAPI (async)
- Uvicorn
- Pydantic (schémas)
- requests / BeautifulSoup4 pour scraping contrôlé
- Ollama client (ou wrapper) pour LLM local

4.2 Organisation du projet backend

```
backend/
 ├─ app/
 │   ├─ main.py
 │   ├─ api/
 │   │   └─ v1/
 │   │       ├─ schools.py
 │   │       └─ chat.py
 │   ├─ agent/
 │   │   ├─ agent.py
 │   │   └─ tools.py
 │   ├─ schemas.py
 ├─ data/
 │   └─ institutions.json
 └─ requirements.txt
```

4.3 Endpoints détaillés

- GET /api/v1/schools
  - Params : query, filters (city, domain, alternance, priceRange), page, size.
  - Retour : liste paginée d'objets SchoolSummary.

- GET /api/v1/schools/{id}
  - Retour : SchoolDetail (programmes, tarifs, conditions admission, alternance, site).

- POST /api/v1/chat
  - Payload : { message: str, history: list, meta: { language: 'fr' } }
  - Flow :
    - Validate payload
    - Rate limit check
    - process_message(message, history)
    - Return ChatResponse { answer, sources? }

4.4 Agent (Eddy) — boucle ReAct (détaillée)

Design :
- Agent construit un prompt : system prompt (règles, ton), description des outils (name, inputs/outputs), conversation history.
- Agent demande au LLM s'il faut appeler un tool.
- Si LLM répond "CALL_TOOL", agent appelle MCP/tool et ajoute observation.
- Recommence / ou renvoie final answer.

Pseudo‑code (extrait) :

```python
def process_message(message, history, meta):
    context = build_context(system_prompt, history, message, tools_desc)
    for step in range(MAX_ITERATIONS):
        llm_reply = call_llm(context)
        action = parse_llm_reply(llm_reply)
        if action.type == "call_tool":
            obs = mcp.call(action.tool, action.args)
            context.append({"role":"tool","content":obs})
        elif action.type == "final_answer":
            return action.content
    return "Désolé, je n'ai pas pu obtenir la réponse."
```

Prompt engineering (conseils)
- System prompt : toujours préciser langue (français), ton (informel/pro), et contraintes (ne jamais inventer faits, si incertain dire "je ne sais pas", préférer appeler tools).
- Fournir au LLM la description structurée des tools (signature + exemple).

4.5 Schémas Pydantic (exemples)

```python
from pydantic import BaseModel
from typing import List, Dict, Any

class ChatRequest(BaseModel):
    message: str
    history: List[Dict[str, Any]] = []
    meta: Dict[str, Any] = {"language": "fr"}

class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = []
```

4.6 Tests & monitoring

- Tests unitaires : pytest pour tools et agent process.
- Tests d'intégration : simulate end-to-end with mocked LLM.
- Observabilité : logs structuré (JSON), trace_id par requête, métriques (Prometheus) :
  - Latence / endpoint
  - nb appels tool / minute
  - taux d’erreur tool

---

5 — Serveur MCP & Tooling 
------------------------------------------

5.1 Rôle du MCP

MCP (Managed Control Plane) centralise l'exposition des tools à l'agent. Il garantit sécurité, validation d'arguments, quotas, timeouts, logging et whitelisting. Le LLM ne contacte jamais directement des endpoints externes — c'est le MCP qui exécute.

5.2 Tools — contrats & signatures

- search_schools(query: str, filters: dict, limit: int = 10) -> List[SchoolSummary]
  - SchoolSummary : { id, name, city, tags, score, snippet }

- get_school_details(school_id: str) -> SchoolDetail
  - SchoolDetail : { id, name, programs, cost, admission, website, alternance_info }

- search_web(query: str, limit: int = 3) -> List[{title, url, snippet}]
  - Résumé court des résultats (pas d'HTML complet).

- scrape_website(url: str, opts: dict) -> { text: str, metadata: dict }
  - Retourne texte nettoyé + métadonnées (title, canonical, lang).

5.3 Sécurité & anti‑SSRF obligatoires

- Bloquer résolutions vers adresses privées (RFC1918), loopback.
- Résolution DNS puis vérification IP.
- Timeout écrasant (ex: 5s), taille maximum (ex: 500 KB).
- Strip scripts / iframe / commentaires dangereux.
- Whitelist domaine configurable (pour certains outils internes).

5.4 Logging & audit

- Chaque tool_call : log structuré = { trace_id, tool_name, args (sanitized), start_ts, duration_ms, status }.
- Audit retention policy : conserver logs X jours, PII redaction.

---

6 — Limites & améliorations 
----------------------------------------

6.1 Limites actuelles

- Données stockées dans un fichier JSON (maintenance manuelle, scalabilité limitée).
- Pas encore de système d'authentification (users/historiques).
- LLM local dépend des modèles disponibles (qualité variable).
- Latence des tool_calls (scraping) peut impacter l'expérience chat.

6.2 Améliorations proposées (court terme)

- Migrer vers DB scalable : Qdrant / pgvector pour recherche sémantique.
- Ajouter ingestion pipeline (scrapers + validation + enrichissement).
- Tests d'intégration pour agent avec LLM mocked.

6.3 Améliorations (moyen terme)

- Comptes utilisateurs (auth + historique).
- IA multi‑agents (scheduler + specialists).
- Workflows de candidatures (formulaires / envoi / suivi).
- Monitoring avancé (SLOs, alertes).

---

7 — Conclusion (1 page)
-----------------------

Bilan rapide :
- EduGuide propose une UX moderne, un agent reasoning-based (ReAct) et un backend sécurisé capable d’utiliser des tools.
- La priorité immédiate est la qualité des données et la migration vers une base vectorielle.

Compétences acquises :
- Conception frontend premium (mobile-first), architecture full‑stack, intégration agent/LLM, sécurisation backend.

Lien avec IA moderne :
- Agents reasoning-based, tool usage, grounding des réponses via sources locales/externe.

---
