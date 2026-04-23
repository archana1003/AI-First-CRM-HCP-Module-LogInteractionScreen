import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { syncFromAI } from './store/interactionSlice';
import LogInteractionForm from './components/LogInteractionForm';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!chatInput) return;
    
    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput('');

    try {
      const response = await axios.post('http://localhost:8000/chat', { message: chatInput });
      const aiText = response.data.response;
      
      setMessages([...newMessages, { role: 'ai', text: aiText }]);

      // Attempt to find JSON in the AI response to sync the form
      const jsonMatch = aiText.match(/\{.*\}/s);
      if (jsonMatch) {
        const extractedData = JSON.parse(jsonMatch[0]);
        dispatch(syncFromAI(extractedData));
      }
    } catch (error) {
      console.error("Error communicating with AI agent:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-['Inter']">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-blue-800">Life Science CRM: HCP Portal</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Structured Form */}
        <LogInteractionForm />

        {/* Right Side: AI Assistant */}
        <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 bg-blue-50 border-b font-semibold">AI Medical Assistant</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input 
              className="flex-1 border rounded-md p-2"
              placeholder="Type meeting notes here..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;