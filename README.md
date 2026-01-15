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

EduGuide est une plateforme intelligente destinée à aider les étudiants à naviguer dans l'enseignement supérieur français. Elle combine une base de données d'établissements, un agent conversationnel IA (Eddy) et des outils de recherche/scraping pour fournir des réponses personnalisées et contextualisées.

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

Flux simplifié : l'utilisateur envoie une question → Frontend envoie POST /api/v1/chat → Backend valide et appelle Agent → Agent peut appeler des outils → LLM (Ollama) produit la réponse → Backend renvoie au Frontend.

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

*Ce document (ReadME.final) fusionne le README, la Documentation Complète et le Rapport Technique initials pour produire une documentation unique, structurée et à jour en français.*