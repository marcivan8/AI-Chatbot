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
11. Annexe : Extraits de code
12. Génération PDF (workflow)

---

## 1. Résumé Exécutif

EduGuide est une plateforme intelligente destinée à aider les étudiants à naviguer dans l'enseignement supérieur français. Elle combine une base de données d'établissements, un agent conversant outillé (Eddy), un moteur de recherche, et des visualisations comparatives.

Objectifs principaux : centralisation des données, personnalisation des conseils, transparence, et sécurité.

---

## 2. Fonctionnalités Clés

- Assistant d'orientation IA (Eddy) en français, capable de raisonner et d'appeler des outils (ReAct).
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

Flux simplifié : l'utilisateur envoie une question → Frontend envoie POST /api/v1/chat → Backend valide et appelle Agent → Agent peut appeler des outils → LLM (Ollama) produit la réponse → Frontend affiche la réponse.

---

## 4. Guide de Démarrage

### 4.1 Prérequis
- macOS 14+, Ubuntu 22.04+, Windows 11 (WSL2)
- Node.js v18.17+ et npm/pnpm
- Python 3.9+
- Ollama installé et démarré (`ollama serve`) si vous utilisez des modèles locaux

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

### 5.2 Organisation du code
Structure simplifiée :

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

### 5.3 Composants importants (extraits)

Chat widget (extrait clé) — fichier: `src/components/chatbot/ChatWidget.jsx`

```jsx
// ChatWidget.jsx (extrait)
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiBook, FiX, FiSend } from "react-icons/fi";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Salut! I'm Eddy. Ask me anything about studying in France! 🇫🇷", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    // send to backend here (POST /api/v1/chat)
  }

  return (
    // JSX rendering omitted for brevity — see file for full component
    <div />
  );
}

export default ChatWidget;
```

Autres composants notables : Navbar, Footer, SchoolCard, Comparator (voir `src/components/...`)

---

## 6. Détails Backend

### 6.1 Stack & organisation
- FastAPI (async)
- Uvicorn
- Pydantic (schémas)
- BeautifulSoup4 pour scraping contrôlé
- Ollama / modèle local pour inférence LLM

Architecture simplifiée :
```
backend/
 ├─ app/
 │   ├─ main.py
 │   ├─ api/v1/
 │   │   ├─ schools.py
 │   │   └─ chat.py
 │   ├─ agent/
 │   │   ├─ agent.py
 │   │   └─ tools.py
 │   ├─ schemas.py
 ├─ data/institutions.json
```

### 6.2 Agent (ReAct) — principe
L'agent suit le pattern ReAct : il raisonne, décide d'appeler un outil si nécessaire, récupère une observation et synthétise une réponse finale.

Extrait pseudo‑code :

```python
def process_message(message, history):
    context = build_context(message, history)
    for step in range(MAX_STEPS):
        action = agent_think(context)
        if action.type == "tool_call":
            obs = call_tool(action.tool, action.args)
            context.append({"role":"tool","content":obs})
        elif action.type == "final_answer":
            return action.content
    return "Désolé, je n'ai pas pu répondre."
```

---

## 7. Sécurité

- Anti‑SSRF : validation d'URL, blocage des adresses internes (127.0.0.1, localhost, RFC1918), résolution IP avant appel.
- Rate limiting : token bucket (ex: 20 req/min/IP) sur endpoints critiques (/api/v1/chat).
- CORS : par défaut `http://localhost:5173` autorisé en dev.
- Prompt injection mitigation : troncature, échappement et validation des entrées.

---

## 8. Gestion des Données

- Institutions list : `backend/data/institutions.json` (format JSON, tableau d'objets école).
- Scraper : `backend/tools/scraper.py` (requests + BeautifulSoup) avec timeouts et user-agent configurable.

Exemple d'objet école :

```json
{
  "id": "school_001",
  "name": "École Exemple",
  "city": "Paris",
  "programs": ["Design", "UX"],
  "cost": 4500,
  "admission": {"type":"concours","deadline":"2025-05-01"},
  "website": "https://..."
}
```

---

## 9. Dépannage & FAQ

- "ModuleNotFoundError": exécuter depuis la racine et activer l'environnement virtuel.
- "Ollama connection refused": vérifier que `ollama serve` tourne et que l'URL configurée est correcte.
- Chatbot répond en anglais : forcer `meta.language = "fr"` dans la requête ou vérifier le system prompt.

---

## 10. Feuille de Route

- T2 2026 : migration vers base vectorielle (Qdrant/pgvector)
- T3 2026 : comptes utilisateurs, historique de chat
- T4 2026 : ingestion de documents (PDF) pour RAG

---

## 11. Annexe : Extraits de code

J'ai inclus ci‑dessous des extraits représentatifs des fichiers sources pour faciliter la lecture. Pour les versions complètes, consultez `src/components/...` et `backend/app/...`.

### src/main.jsx

```javascript
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";
createRoot(document.getElementById("root")).render(<App />);
```

### src/components/layout/Layout.jsx (extrait)

```jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "../chatbot/ChatWidget";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
```

### src/components/layout/Navbar.jsx (extrait)

```jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: "School Search", path: "/search" },
    { name: "Careers", path: "/jobs" },
    { name: "Compare", path: "/compare" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* markup omitted for brevity */}
    </nav>
  );
}
```

### src/components/schools/Comparator.jsx (extrait)

```jsx
import React, { useState } from "react";
import { mockSchools } from "../../data/mockSchools";

export default function Comparator() {
  const [school1, setSchool1] = useState(mockSchools[0]);
  const [school2, setSchool2] = useState(mockSchools[1]);

  return (
    <div className="container mx-auto">{/* comparator UI */}</div>
  );
}
```

---

## 12. Génération PDF (workflow)

J'ai ajouté un workflow GitHub Actions qui génère automatiquement un PDF du README lors des pushes sur `main` et sur demande (workflow_dispatch). Le workflow utilise `pandoc` + `xelatex` pour convertir le Markdown en PDF et upload l'artifact.

Fichier ajouté : `.github/workflows/generate-docs.yml`

Si vous préférez que je n'ajoute pas de workflow sur `main`, dites-le et j'annule ce commit.

---

Fin du README. Pour toute modification (ajout de captures d'écran, insertion d'images, ou export PDF personnalisé), dites-moi comment vous souhaitez procéder.
