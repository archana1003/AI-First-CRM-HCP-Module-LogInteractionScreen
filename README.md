# AI-First-CRM-HCP-Module-LogInteractionScreen
# AI-First CRM: HCP Interaction Module

This repository contains a specialized Healthcare Professional (HCP) module for an AI-First Customer Relationship Management (CRM) system. Designed with a Life Sciences domain mindset, it enables field representatives to log and manage interactions through both structured forms and a conversational AI interface.

## 🚀 Tech Stack

- **Frontend:** React.js, Redux (State Management), Axios
- **Backend:** Python, FastAPI
- **AI Orchestration:** LangGraph
- **LLM:** Groq (Model: `gemma2-9b-it`)
- **Database:** MySQL / PostgreSQL (or SQLite for local demonstration)
- **Typography:** Google Inter

## 🧠 AI Agent & Tools

The core of this application is a **LangGraph** agent that manages the state of HCP interactions. The agent uses the `gemma2-9b-it` model to process natural language and execute specific business logic through a suite of tools.

### Integrated Tools:
1.  **Log Interaction (Required):** Automatically extracts structured data (HCP Name, Date, Summary) from raw chat text and saves it to the database.
2.  **Edit Interaction (Required):** Allows natural language updates to existing records (e.g., "Change the follow-up date for my last meeting").
3.  **HCP History Retrieval:** Fetches previous meeting notes to provide context to the representative before or during a call.
4.  **Compliance Scanner:** Analyzes interaction summaries to ensure they adhere to medical ethics and regulatory standards.
5.  **Clinical Entity Extractor:** Identifies specific drug names, symptoms, or clinical conditions mentioned during the conversation.

## 🛠️ Architecture

The system utilizes a dual-interface approach. The **Redux** store acts as a bridge: as the AI Agent identifies entities in the chat, it dispatches actions to update the **Structured Form** in real-time, ensuring data integrity and reducing manual entry.

## 📥 Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.10+
- Groq API Key

### Backend Setup
1. Navigate to the `/backend` directory.
2. Create a virtual environment: `python -m venv venv`.
3. Activate the environment:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`.
5. Create a `.env` file and add: `GROQ_API_KEY=your_key_here`.
6. Start the server: `uvicorn main:app --reload`.

### Frontend Setup
1. Navigate to the `/frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

## 📂 Project Structure

├── backend/
│   ├── main.py          # FastAPI Endpoints
│   ├── agent.py         # LangGraph Logic & Tools
│   └── database.py      # SQLAlchemy Models & DB Config
├── frontend/
│   ├── src/
│   │   ├── store/       # Redux Toolkit Slices
│   │   ├── components/  # LogInteractionScreen Components
│   │   └── App.jsx      
│   └── package.json
└── README.md
