import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Mic, Volume2, Volume2 as Volume2Off, ChefHat } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const recipeDatabase = {
  getRecipeByName: (name: string) => {
    // Simulated recipe database lookup
    const recipes = {
      'pizza': 'To make a traditional Italian pizza: 1. Make dough with 00 flour, yeast, salt, and water. 2. Let rise for 24h. 3. Top with San Marzano tomatoes and fresh mozzarella. 4. Bake at highest oven temperature.',
      'pasta': 'For classic pasta: 1. Boil water with salt. 2. Cook pasta al dente. 3. Prepare sauce of choice. 4. Combine and finish with olive oil.',
      'sushi': 'For basic sushi rolls: 1. Cook sushi rice. 2. Prepare fillings. 3. Roll with nori sheets. 4. Slice and serve with soy sauce.',
      // Add more recipes as needed
    };
    return recipes[name.toLowerCase()] || 'I can help you find a recipe for that dish! What would you like to know specifically?';
  },
  
  getCookingTip: (ingredient: string) => {
    const tips = {
      'rice': 'For perfect rice, use a 1:1.5 ratio of rice to water. Rinse until water runs clear.',
      'pasta': 'Salt your pasta water until it tastes like the sea. This seasons the pasta from within.',
      'meat': 'Let meat rest at room temperature before cooking and after for juicier results.',
      // Add more tips
    };
    return tips[ingredient.toLowerCase()] || 'I can provide cooking tips for that ingredient. What would you like to know?';
  }
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(null, transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      setSpeechEnabled(true);
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakMessage = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const handleSubmit = async (e: React.FormEvent | null, voiceInput?: string) => {
    if (e) e.preventDefault();
    const messageText = voiceInput || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Enhanced bot response logic
    setTimeout(() => {
      let botResponse = '';
      const lowerText = messageText.toLowerCase();

      if (lowerText.includes('recipe for') || lowerText.includes('how to make')) {
        const dish = lowerText.replace('recipe for', '').replace('how to make', '').trim();
        botResponse = recipeDatabase.getRecipeByName(dish);
      } else if (lowerText.includes('tip') || lowerText.includes('how do i cook')) {
        const ingredient = lowerText.split(' ').pop() || '';
        botResponse = recipeDatabase.getCookingTip(ingredient);
      } else {
        botResponse = "I'm your culinary AI assistant! I can help you with recipes, cooking tips, and techniques. What would you like to know?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      if (isSpeaking) {
        speakMessage(botResponse);
      }
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-full shadow-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105"
        aria-label="Open chat"
      >
        <ChefHat className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              <h3 className="font-semibold">Culinary Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              {speechEnabled && (
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label={isSpeaking ? "Disable voice response" : "Enable voice response"}
                >
                  {isSpeaking ? <Volume2 className="w-5 h-5" /> : <Volume2Off className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about any cuisine..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
              />
              {speechEnabled && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-all ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-full hover:from-orange-700 hover:to-red-700 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}