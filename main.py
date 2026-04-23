from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from agent import graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_with_agent(request: ChatRequest):
    inputs = {"messages": [HumanMessage(content=request.message)]}
    config = {"configurable": {"thread_id": "1"}}
    
    # Process through LangGraph
    final_state = await graph.ainvoke(inputs, config=config)
    
    # Return the assistant's final response
    return {"response": final_state["messages"][-1].content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)