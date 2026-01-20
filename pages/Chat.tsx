import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm your AI Agronomist. How can I help you with your farm today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await GeminiService.chatWithAgronomist(userMessage.text, history);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to the network right now. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-agri-600 p-4 text-white flex items-center space-x-3">
        <div className="bg-white/20 p-2 rounded-full">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="font-bold text-lg">AI Agronomist</h1>
          <div className="flex items-center space-x-2 text-xs text-agri-100">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Online • Powered by Gemini</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-agri-600 text-white'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex max-w-[80%] space-x-3">
               <div className="w-8 h-8 rounded-full bg-agri-600 text-white flex items-center justify-center shrink-0 mt-1">
                 <Bot size={16} />
               </div>
               <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-agri-500 focus-within:bg-white transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 py-2 outline-none"
            placeholder="Ask about crops, weather, or soil..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-lg transition-colors ${
              input.trim() && !isLoading 
                ? 'bg-agri-600 text-white hover:bg-agri-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          AI can make mistakes. Please verify important agricultural decisions.
        </p>
      </div>
    </div>
  );
};

export default Chat;
