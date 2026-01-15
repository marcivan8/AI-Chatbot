# 🎓 EduGuide - Plateforme d'Orientation Étudiante par IA

**EduGuide** est une plateforme moderne et intelligente conçue pour aider les étudiants à naviguer dans le paysage de l'enseignement supérieur français. Elle combine une base de données robuste d'établissements et de carrières avec **Eddy**, un assistant IA empathique propulsé par des LLMs locaux (Ollama).

---

## 🚀 Fonctionnalités Clés

### 🤖 Assistant d'Orientation IA (Eddy)
-   **Chat en Langage Naturel** : Posez des questions sur les écoles, les métiers ou obtenez des conseils d'orientation.
-   **RAG Contextuel** : Eddy utilise un système de "Génération Augmentée par la Récupération" (RAG) pour fournir des réponses précises basées sur nos données réelles.
-   **Accès Web** : Peut naviguer sur internet (de manière sécurisée) pour trouver des informations récentes absentes de la base de données.
-   **Sécurité** : Protégé contre les injections de prompt et les attaques SSRF.

### 🏫 Explorateur d'Écoles & Carrières
-   **Recherche Intelligente** : Filtrez les écoles par ville, type (Ingénieur, Commerce, etc.) et domaine.
-   **Visualisation de Données** : Graphiques interactifs montrant les perspectives de carrière, les salaires et les statistiques des écoles.
-   **Comparateur** : Comparez les écoles côte à côte pour faire le meilleur choix.

### 🛡️ Sécurisé & Évolutif
-   **Limitation de Débit (Rate Limiting)** : Protège l'API contre les abus.
-   **Protection CORS** : Limite strictement l'accès API au frontend officiel.
-   **Défenses SSRF** : Empêche l'IA d'accéder aux ressources réseaux internes.

---

## 🛠️ Stack Technique

### Frontend
-   **Framework** : React 18 + Vite
-   **Bibliothèque UI** : Tailwind CSS v4 + Radix UI + Shadcn/UI
-   **Visuels** : Recharts (Graphiques), Framer Motion (Animations), Lucide (Icônes)

### Backend
-   **API** : FastAPI (Python 3.9+)
-   **Moteur IA** : Ollama (modèles locaux comme Gemma 2 ou Mistral)
-   **Outils** : BeautifulSoup4 (Scraping), Pydantic (Validation)
-   **Sécurité** : Middleware personnalisé pour le Rate Limiting & la Sanitization des entrées.

---

## ⚡ Pour Commencer

### Prérequis
1.  **Node.js** (v18+) & **npm/pnpm**
2.  **Python** (v3.9+)
3.  **Ollama** : Installé et démarré.
    -   Télécharger sur [ollama.com](https://ollama.com).
    -   Télécharger le modèle : `ollama pull gemma2`.

### Installation

1.  **Cloner le dépôt** :
    ```bash
    git clone https://github.com/votre-repo/eduguide.git
    cd eduguide
    ```

2.  **Installer les dépendances Frontend** :
    ```bash
    npm install
    ```

3.  **Installer les dépendances Backend** :
    ```bash
    cd backend
    pip install -r requirements.txt
    cd ..
    ```

### 🏃‍♂️ Lancer la Plateforme

Nous fournissons un script pour tout démarrer en une fois :

```bash
./start.sh
```

Cela va :
1.  Arrêter tout processus utilisant les ports 8000 ou 5173.
2.  Démarrer le **Backend FastAPI** sur `http://localhost:8000`.
3.  Démarrer le **Frontend React** sur `http://localhost:5173`.

---

## 📂 Structure du Projet

```text
.
├── backend/                # Backend Python FastAPI
│   ├── app/                # Logique principale (API, Agent)
│   ├── models/             # Wrappers Client LLM
│   ├── tools/              # Outils pour l'Agent (Search, Scraper)
│   └── data/               # Bases de données JSON (Écoles, Carrières)
├── src/                    # Code source Frontend React
│   ├── app/                # Composants fonctionnels (Chatbot, Analytics)
│   ├── components/         # Composants UI partagés
│   └── styles/             # CSS Global & config Tailwind
├── start.sh                # Script de lancement
└── README.md               # Ce fichier
```

## 🔒 Sécurité

Ce projet implémente plusieurs bonnes pratiques de sécurité :
-   **Validation des Entrées** : Les entrées utilisateurs sont nettoyées et tronquées.
-   **Garde-fous (Guardrails)** : L'IA suit des politiques d'utilisation strictes via le system prompt.
-   **Sécurité Réseau** : Le web scraper bloque les plages IP privées/locales (protection SSRF).

---
*Créé pour le AI Chatbot Bootcamp EPITECH.*
