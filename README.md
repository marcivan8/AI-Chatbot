# 🎓 EduGuide - AI-Powered Student Orientation Platform

**EduGuide** is a modern, intelligent platform designed to help students navigate the French higher education landscape. It combines a robust database of institutions/careers with **Eddy**, an empathetic AI assistant powered by local LLMs (Ollama).

---

## 🚀 Key Features

### 🤖 AI Orientation Assistant (Eddy)
-   **Natural Language Chat**: Ask questions about schools, careers, or orientation advice.
-   **Contextual RAG**: Eddy uses a "Retrieval Augmented Generation" system to fetch real data from our database and answering accurately.
-   **Web Access**: Can browse the web (securely) to find up-to-date information not in the database.
-   **Security**: Protected against Prompt Injection and SSRF attacks.

### 🏫 School & Career Explorer
-   **Smart Search**: Filter schools by city, type (Engineering, Business, etc.), and domain.
-   **Data Visualization**: Interactive charts showing career outlooks, salaries, and school statistics.
-   **Comparisons**: Compare schools side-by-side.

### 🛡️ Secure & Scalable
-   **Rate Limiting**: Protects API endpoints from abuse.
-   **CORS Protection**:Strictly limits API access to the official frontend.
-   **SSRF Defenses**: Prevents the AI from accessing internal network resources.

---

## 🛠️ Tech Stack

### Frontend
-   **Framework**: React 18 + Vite
-   **UI Library**: Tailwind CSS v4 + Radix UI + Shadcn/UI
-   **Visuals**: Recharts (Graphs), Framer Motion (Animations), Lucide (Icons)

### Backend
-   **API**: FastAPI (Python 3.9+)
-   **AI Engine**: Ollama (running local models like Mistral or Llama 2/3)
-   **Tools**: BeautifulSoup4 (Scraping), Pydantic (Validation)
-   **Security**: Custom Middleware for Rate Limiting & Input Sanitization

---

## ⚡ Getting Started

### Prerequisites
1.  **Node.js** (v18+) & **npm/pnpm**
2.  **Python** (v3.9+)
3.  **Ollama**: Installed and running.
    -   Install from [ollama.com](https://ollama.com).
    -   Pull a model: `ollama pull mistral` (or your preferred model).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/eduguide.git
    cd eduguide
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies**:
    ```bash
    cd backend
    pip install -r requirements.txt
    cd ..
    ```

### 🏃‍♂️ Running the Platform

We provide a helper script to start everything at once:

```bash
./start.sh
```

This will:
1.  Kill any processes currently using ports 8000 or 5173.
2.  Start the **FastAPI Backend** at `http://localhost:8000`.
3.  Start the **React Frontend** at `http://localhost:5173`.

---

## 📂 Project Structure

```text
.
├── backend/                # Python FastAPI Backend
│   ├── app/                # Main application logic (API, Agent)
│   ├── models/             # LLM Client wrappers
│   ├── tools/              # Tools for the Agent (Search, Scraper)
│   └── data/               # JSON Databases (Schools, Careers)
├── src/                    # React Frontend source
│   ├── app/                # Feature components (Chatbot, Analytics)
│   ├── components/         # Shared UI components
│   └── styles/             # Global CSS & Tailwind config
├── start.sh                # Launcher script
└── README.md               # This file
```

## 🔒 Security

This project implements several security best practices:
-   **Input Validation**: User inputs are sanitized and truncated.
-   **Output Guardrails**: The AI is instructed via usage policies in the system prompt.
-   **Network Security**: The web scraper blocks private/local IP ranges (SSRF protection).

---
*Created for the AI Chatbot Bootcamp EPITECH.*
