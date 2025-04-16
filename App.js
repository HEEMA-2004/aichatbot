
import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const appendMessage = (message, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: sender },
    ]);
  };

  const fetchChatbotResponse = async (message) => {
    const responses = {
      "What are the top universities offering programs in computer science?": "The top universities offering programs in computer science include MIT, Stanford, Carnegie Mellon, UC Berkeley, and Harvard.",
      "Based on my academic history, what scholarships am I eligible for?": "Based on your academic history, you may be eligible for scholarships such as the Fulbright Scholarship, Rhodes Scholarship, and various university-specific scholarships.",
      "How do the admission requirements for this university compare to the ones we discussed earlier?": "The admission requirements for this university are similar to the ones we discussed earlier, including a strong GPA, standardized test scores, letters of recommendation, and a personal statement.",
      "What are the latest rankings for engineering programs in the US?": "The latest rankings for engineering programs in the US include MIT, Stanford, UC Berkeley, Caltech, and Georgia Tech.",
      "Can you suggest universities that offer financial aid to international students?": "Universities that offer financial aid to international students include Harvard, Yale, Princeton, MIT, and Stanford."
    };

    return responses[message] || "I'm sorry, I don't have information on that topic. Please try asking something else.";
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      appendMessage(userInput, 'user');
      setUserInput('');
      const botReply = await fetchChatbotResponse(userInput);
      appendMessage(botReply, 'bot');
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  };

  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-500 p-4">
            <h1 className="text-white text-2xl font-bold">AI Chatbot for Higher Education</h1>
          </div>
          <div className="p-4">
            <div id="chat-window" className="h-96 overflow-y-scroll p-2 border border-gray-300 rounded-lg bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg max-w-xs break-words ${
                    msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
                  }`}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input
                id="user-input"
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                id="send-btn"
                className="bg-blue-500 text-white p-2 rounded-r-lg"
                onClick={handleSend}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
