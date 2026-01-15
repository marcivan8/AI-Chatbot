# ReadME.final — Documentation Unifiée

**Projet** : EduGuide — Plateforme d'Orientation Étudiante par IA
**Date** : 15 Janvier 2026
**Version** : 1.0.0
**Auteurs** : Équipe EduGuide (Antigravity / Google DeepMind)

---

## 📚 Table des Matières

1. Résumé Exécutif
2. Fonctionnalités Clés
3. Architecture Système
4. Guide de Démarrage
5. Détails Frontend
6. Détails Backend
7. Sécurité
8. Gestion des Données
9. Dépannage & FAQ
10. Feuille de Route
11. Licence & Contribution

---

## 1. Résumé Exécutif

EduGuide est une plateforme intelligente destinée à aider les étudiants à naviguer dans l'enseignement supérieur français. Elle combine une base de données d'établissements, un agent conversat...

Objectifs principaux : centralisation des données, personnalisation des conseils, transparence, et sécurité.

---

## 2. Fonctionnalités Clés

- Assistant d'orientation IA (Eddy) en français, capable de répondre en langage naturel.
- Système RAG (Génération Augmentée par Récupération) pour lier raisonnement et données locales.
- Exploration et filtrage d'écoles par ville, type et domaine.
- Visualisations (salaires, débouchés) et comparateur d'établissements.
- Défenses contre les injections de prompt, SSRF et limitation de débit.

---

## 3. Architecture Système

EduGuide adopte une architecture client-serveur découpée : Frontend (React + Vite) ↔ Backend (FastAPI) ↔ Agent IA (Eddy) ↔ Outils (scraper, base JSON) ↔ LLM local (Ollama).

Diagramme (haut niveau) :

```mermaid
graph TD
    User[Étudiant] -->|Interagit via Navigateur| FE[Frontend (React + Vite)]
    FE -->|HTTP/REST| BE[Backend (FastAPI)]
    subgraph "Couche Frontend"
        FE --> UI[Composants Radix UI]
        FE --> State[React State/Hooks]
    end
    subgraph "Couche Backend"
        BE --> API[Routeur FastAPI]
        API --> Agent[Agent IA (Eddy)]
        API --> Services[Services de Données]
        Agent -->|Inférence| Ollama[Ollama (LLM Local)]
        Agent -->|RAG| Tools[Outils Agent]
        Tools -->|Lecture| JSON[institutions.json]
        Tools -->|Récupération| Web[Scraper Internet]
    end
```

Flux simplifié : l'utilisateur envoie une question → Frontend envoie POST /api/v1/chat → Backend valide et appelle Agent → Agent peut appeler des outils → LLM (Ollama) produit la réponse →...

---

## 4. Guide de Démarrage

### 4.1 Prérequis
- Systèmes supportés : macOS 14+, Ubuntu 22.04+, Windows 11 (WSL2).
- Node.js v18.17+ et npm/pnpm.
- Python 3.9+.
- Ollama installé et démarré (`ollama serve`) ; modèles locaux (ex: gemma2, mistral) téléchargés.

### 4.2 Installation rapide

```bash
git clone https://github.com/marcivan8/AI-Chatbot.git
cd AI-Chatbot
```

Installer le frontend :

```bash
npm install
```

Installer le backend :

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 4.3 Lancer la plateforme

Un script `start.sh` est fourni pour orchestrer le démarrage : il stoppe les processus sur les ports 8000/5173 puis lance Uvicorn (FastAPI) et Vite.

```bash
./start.sh
```

Accéder à l'application : http://localhost:5173

---

## 5. Détails Frontend

### 5.1 Stack Technique
- Vite + React 18
- Tailwind CSS v4, Radix UI, Shadcn/UI
- Framer Motion, Recharts, Lucide

### 5.2 Composants importants
- `EddyChatbot.jsx` : widget de chat; gère `messages`, `isOpen`, `input`, et appelle l'API.
- `SchoolCardNew.jsx` : carte réutilisable pour une école.
- `InsightsView.jsx` : tableau de bord de visualisations (Recharts).

### 5.3 Gestion d'état
Approche hybride : état local (`useState`) pour UI, Context API pour l'authentification/session si nécessaire.

### 5.4 Architecture du code
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
 ├─ data/
 ├─ assets/
 └─ main.jsx

### 5.5 Communication avec le backend

Le front-end est totalement découplé du backend → facilité de maintenance.

### 5.6 State Management
Aucun Redux → état local simple.
États principaux :

searchQuery
filters
comparisonList
selectedSchool
selectedCareer
messages (chat IA)

Le rendu réagit automatiquement aux changements.

### 5.7 Composants principaux
🏫 SchoolCardNew.jsx
Carte école concise → ouverte en modale.
📝 SchoolDetailsModal.jsx
Fiche école :

admission
coûts
programmes
alternance
site

⚖️ ComparisonView.jsx
Comparaison côte à côte → décision facilitée.
💼 CareerCard & CareerDetailsModal

exploration métiers
salaires → graphiques
parcours d’étude → timelines

### 5.8 Navigation & UX

Navigation mobile-first (BottomNav)
Layout cohérent
Modales fluides
Suggestions IA seulement au début

### 5.9 Chatbot Eddy intégration

gestion des messages
historique conversationnel
appels backend
rendu Markdown propre

---

## 6. Détails Backend

### 6.1 Architecture API
Backend en FastAPI (async), documentation Swagger automatique.
Endpoints clés :
- GET /api/v1/schools — recherche filtrée.
- GET /api/v1/schools/{id} — détail école.
- POST /api/v1/chat — traitement du message par l'Agent et réponse IA.

### 6.2 Agent (Eddy)
Agent implémente une boucle ReAct : observation → pensée → action (appel d'outils) → synthèse.
Principales protections : troncature des entrées >1000 caractères, échappement des balises.

Extrait typique (pseudo) :
```python
if len(user_message) > 1000:
    user_message = user_message[:1000] + "... (truncated)"
safe_message = user_message.replace("<", "&lt;")
```

### 6.3 Modèles de données
Pydantic — `School`, `ChatRequest`, `ChatResponse` définis dans `backend/app/schemas.py`.

### 6.4 Outils disponibles
- `search_schools` : recherche dans `backend/data/institutions.json`.
- `scrape_website` : récupération et nettoyage HTML (avec protections SSRF).
- `search_web` : espace réservé pour intégration API externe.

---

## 7. Sécurité

Principes : défense en profondeur — validations, filtrage, rate limiting.

### 7.1 Injection de Prompt
- Entrées encapsulées et échappées, troncature des messages trop longs.
- L'agent traite l'entrée comme données (ex: balises `<user_query>`).

### 7.2 SSRF
`validate_url` bloque `localhost`, `127.0.0.1`, `::1` et les plages IP privées.

### 7.3 Rate Limiting
Token Bucket en mémoire — 20 requêtes / minute / IP ; retourne HTTP 429 si dépassé.

### 7.4 CORS
Seule origine autorisée par défaut : `http://localhost:5173`.

---

## 8. Gestion des Données

### 8.1 Base des établissements
Fichier principal : `backend/data/institutions.json` (tableau d'objets JSON). Maintenance actuellement manuelle.

### 8.2 Scraper
`backend/tools/scraper.py` utilise `requests` + `BeautifulSoup`. Timeouts stricts (10s) et User-Agent configurable.

---

## 9. Dépannage & FAQ

- "ModuleNotFoundError" — exécuter depuis la racine ou définir PYTHONPATH ; activez l'environnement virtuel.
- "Ollama connection refused" — assurez-vous que `ollama serve` tourne.
- Chatbot en anglais — vérifier le system prompt; reformuler la requête ou recharger le modèle.
- Ajouter une école — modifier `backend/data/institutions.json` puis redémarrer le backend.

---

## 10. Feuille de Route

- T2 2026 : Migration vers une base vectorielle (Qdrant / pgvector) pour recherche sémantique.
- T3 2026 : Authentification & comptes (Supabase/NextAuth), historique de chat.
- T4 2026 : Ingestion de documents (PDF) pour enrichir le RAG.

---

## 11. Licence & Contribution

Projet open-source — PRs et issues bienvenues. Respectez le code de conduite et fournissez des tests pour les changements majeurs.

---

# Annexe — Détails supplémentaires fournis (architecture, parcours, frontend, backend, MCP & tooling)

Ci-dessous j'intègre le contenu additionnel que vous avez fourni — il complète et détaille la documentation principale. Les images doivent être ajoutées dans `assets/docs/` (ou `README_images/`) pour être visibles depuis ce README. Je propose les noms de fichiers suivants :
- assets/docs/parcours_utilisateur.png
- assets/docs/sequence_chat_flow.png
- assets/docs/frontend_flow.png
- assets/docs/tools_architecture.png

Si vous me donnez les fichiers image je peux les ajouter au repo aussi.

## 1. Présentation générale du projet

1.1 Contexte

EduGuide est une plateforme d’orientation éducative destinée aux étudiants, lycéens et personnes en reconversion. Elle répond à une problématique majeure : le manque de visibilité sur les parcours d’étude et les débouchés professionnels.

Constats initiaux :

- Les bases de données éducatives sont fragmentées, hétérogènes, parfois obsolètes.
- Les étudiants ne savent pas relier métiers ↔ parcours ↔ écoles.
- Les outils actuels sont statiques, non personnalisés, et ne permettent pas de comparer efficacement les écoles.
- Les chatbots éducatifs classiques sont limités : ils hallucinent, ne peuvent pas utiliser d’outils ou consulter des données fiables.

EduGuide propose une solution moderne, intégrée et intelligente :

- Un assistant IA outillé (Eddy) capable de raisonner (ReAct)
- Un moteur de recherche d’écoles performant
- Un comparateur ergonomique
- Des fiches métiers enrichies
- Un front-end premium et mobile-first

1.2 Objectifs

EduGuide vise à :

- centraliser l’information éducative dans un modèle unifié,
- guider l’étudiant depuis un métier jusqu’à la sélection d’écoles adaptées,
- offrir une expérience moderne, fluide et compréhensible,
- proposer une IA fiable, non hallucinatoire, et capable d���utiliser des outils,
- permettre une comparaison efficace des options scolaires.

1.3 Périmètre fonctionnel

Fonctionnalités principales :

- Recherche d’écoles (texte + filtres intelligents)
- Filtres dynamiques (villes, niveaux, domaines, alternance…)
- Fiches écoles complètes :
  - programmes
  - coût
  - admission
  - alternance
  - site web

Fiches métiers enrichies :

- compétences
- débouchés
- salaires
- parcours d’études

Matching : métiers → écoles
Comparateur multi‑écoles
Assistant IA multi‑étapes (ReAct)
Persistences locales (favoris + comparateur)
Dashboard statistiques
Scraping intelligent de sites externes

1.4 Parcours utilisateur (image fournie)

![Parcours utilisateur](assets/docs/parcours_utilisateur.png)

## 2. Architecture globale

2.1 Vue d’ensemble de l’architecture (schéma)

Description : le système se compose de l’utilisateur (navigateur mobile/desktop), du frontend React, d’une API FastAPI, d’un agent (Eddy) capable d’appeler des tools, d’un ensemble de tools (search_schools, get_school_details, search_web, scrape_website) et d’un DB (actuellement JSON en fichier) — le flux suit une chaîne claire : requête utilisateur → appel API → agent ReAct → tool(s) si nécessaire → observation → synthèse → réponse.

2.2 Flux de données détaillé

- Le frontend effectue des requêtes GET/POST pour l’affichage des listes et le chat.
- Le backend valide et normalise les requêtes puis transmet au process_message() de l’agent.
- L’agent décide d’appeler ou non un tool. Si oui → tool exécute (ex: recherche dans JSON, scraping) et retourne une observation.
- L’agent synthétise l’observation et produit la réponse finale envoyée au frontend.

2.3 Architecture complète (schémas / diagrammes séquence)

Sequence flow diagram :

![Sequence chat flow](assets/docs/sequence_chat_flow.png)

## 3. Frontend

(Documentation Front-End intégrée entièrement et enrichie)

3.1 Introduction

Le front-end d’EduGuide constitue la couche visible, interactive, et ergonomique du projet.
Objectifs :

- permettre l’exploration fluide d’information,
- réduire la charge cognitive,
- assurer une expérience mobile-first,
- intégrer l’assistant Eddy de façon naturelle,
- offrir une navigation moderne et premium.

L’application est une SPA (Single Page Application), afin d’éviter les rechargements de page.

3.2 Technologies utilisées

⚛️ React

- Architecture composants
- Réutilisable, maintenable
- Hooks (useState, useEffect)
- Écosystème riche (Framer Motion, Recharts…)

⚡ Vite

- Build ultrarapide
- HMR instantané
- Setup minimaliste → idéal pour un projet itératif

🎨 TailwindCSS

- Utility-first
- Responsive natif
- Glassmorphism / ombres / dégradés
- Styles lisibles directement dans le JSX

🎞️ Framer Motion

- Animations fluides
- Transitions non-bloquantes
- Modales animées
- Amélioration perçue de qualité UX

3.3 Architecture du code et composants (récapitulatif)

![Frontend flow](assets/docs/frontend_flow.png)

3.4 Communication avec le backend

Les appels clés :
- GET /schools — récupération liste
- GET /schools/{id} — détail
- GET /careers — liste métiers
- GET /stats — données impératives pour dashboards
- POST /chat — dialogue avec Eddy

3.5 State & UX patterns

- État local pour UI et filtres
- Context pour session/utilisateur
- Pagination lazy-load pour listes
- Optimisation : debounce sur champ de recherche

## 4. Backend

4.1 Technologies utilisées

- FastAPI
- Uvicorn
- Pydantic
- BeautifulSoup4 / Selenium (si nécessaire pour certains sites)
- Ollama / Gemini (modèles locaux ou proxys)
- Protection SSRF / CORS strict / Rate Limiting

4.2 Modèle IA – ReAct Loop

Le cœur de l’agent suit le pattern ReAct :
- Observation (lecture des outils / données)
- Raisonner (prompt engineering et contexte)
- Action (tool call ou réponse)
- Synthèse (final answer)

4.3 Gestion du contexte

Le backend reçoit et transmet un objet JSON du type :

{ 
  "message": "...",
  "history": [ {"role":"user|assistant|tool","content":"..."} ],
  "meta": {"language":"fr","user_id":"..."}
}

L’agent utilise l’historique pour maintenir la continuité et éviter les comportements hors-sujet.

## 5. Serveur MCP & Tooling

5.1 Rôle du MCP

Le MCP (Managed Control Plane) centralise la définition et l’exécution des tools exposés à l’agent. Il :

- Enregistre les tools disponibles et leurs schémas d’entrée/sortie
- Valide les appels (type, URL, timeouts)
- Applique les protections (SSRF / list blanche / timeouts)
- Fournit des logs et métriques pour audit

5.2 Schéma des tools

- search_schools(query, filters) -> liste d'écoles (limitée)
- get_school_details(school_id) -> objet complet
- search_web(query) -> résultats web résumés
- scrape_website(url, opts) -> texte nettoyé

5.3 Détails des tools

🔍 search_schools
Recherche fuzzy dans le JSON (ou dans une future base vectorielle). Supporte filtres, tri, pagination.

🏫 get_school_details
Retour complet : prix, admission, formations, ville, site.

🌐 search_web
Utilise DuckDuckGo / endpoint tiers pour fournir résultats rapides et éviter scraping massif.

📄 scrape_website
Scraping + nettoyage (BeautifulSoup). Anti-SSRF : validation stricte des URLs et timeouts serrés.

Diagramme tools / agent :

![Tools architecture](assets/docs/tools_architecture.png)

## 6. Limites du projet & améliorations

Court terme

- enrichir encore les données
- ajouter lycées / BTS / prépas
- latence IA < 1 seconde
- optimisation pagination

Moyen terme

- comptes utilisateurs
- IA multi‑agents
- candidatures écoles
- migration JSON → base scalable

## 7. Conclusion

7.1 Bilan rapide

EduGuide propose :

- une UX moderne, mobile-first
- une IA fiable capable d’utiliser des outils
- un backend robuste et sécurisé
- une architecture propre et évolutive
- un parcours complet : métier → écoles → comparaison → décision

7.2 Compétences acquises

- développement frontend premium
- architecture full‑stack claire
- intégration IA ReAct
- sécurisation backend avancée (SSRF, CORS, Rate Limit)
- structuration de données éducationnelles

7.3 Lien avec l’IA moderne

- Reasoning-based agents
- Tool‑Use / MCP
- AI Grounding
- Multi-step decision making

---

*Ce document (ReadME.final) fusionne le README, la Documentation Complète et le Rapport Technique initials pour produire une documentation unique, structurée et à jour en français.*