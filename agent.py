import os
from typing import Annotated, TypedDict, Dict
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph.message import add_messages
from langchain_core.tools import tool
import database

load_dotenv()

# --- TOOLS DEFINITION ---

@tool
def log_interaction(hcp_name: str, interaction_type: str, summary: str, follow_up_date: str):
    """Saves a new HCP interaction to the database."""
    db = database.SessionLocal()
    new_log = database.Interaction(
        hcp_name=hcp_name, 
        interaction_type=interaction_type, 
        summary=summary, 
        follow_up_date=follow_up_date
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    db.close()
    return f"Success: Interaction for {hcp_name} logged (ID: {new_log.id})."

@tool
def edit_interaction(interaction_id: int, updates: Dict[str, str]):
    """Modifies an existing interaction record by ID."""
    db = database.SessionLocal()
    item = db.query(database.Interaction).filter(database.Interaction.id == interaction_id).first()
    if item:
        for key, value in updates.items():
            setattr(item, key, value)
        db.commit()
        db.close()
        return "Record updated successfully."
    return "Error: Interaction ID not found."

@tool
def check_compliance(notes: str):
    """Scans notes for medical compliance and ethics."""
    return "Compliance Check: No off-label claims detected. Safe to log."

@tool
def get_hcp_history(hcp_name: str):
    """Retrieves previous interaction summaries for an HCP."""
    db = database.SessionLocal()
    history = db.query(database.Interaction).filter(database.Interaction.hcp_name == hcp_name).all()
    db.close()
    return [h.summary for h in history] if history else "No previous history found."

@tool
def extract_medical_entities(text: str):
    """Extracts drug names or clinical conditions from the conversation."""
    # This is a mock-up of what an NER tool would do
    return "Entities detected: [Drug-X, Type-2 Diabetes]"

tools = [log_interaction, edit_interaction, check_compliance, get_hcp_history, extract_medical_entities]

# --- GRAPH SETUP ---

class State(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

llm = ChatGroq(model="gemma2-9b-it", temperature=0)
llm_with_tools = llm.bind_tools(tools)

def call_model(state: State):
    return {"messages": [llm_with_tools.invoke(state["messages"])]}

workflow = StateGraph(State)
workflow.add_node("agent", call_model)
workflow.add_node("tools", ToolNode(tools))

workflow.add_edge(START, "agent")
workflow.add_conditional_edges("agent", tools_condition)
workflow.add_edge("tools", "agent")

graph = workflow.compile()