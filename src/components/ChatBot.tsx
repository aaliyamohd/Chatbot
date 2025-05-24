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
    const recipes = {
      'pizza': `For an authentic Italian Margherita Pizza:

1. Dough:
   - Mix 00 flour, yeast, salt, and water
   - Knead for 10-15 minutes until smooth
   - Let rise for 24 hours at room temperature

2. Sauce:
   - Crush San Marzano tomatoes
   - Add a pinch of salt

3. Assembly:
   - Stretch dough by hand (don't use rolling pin)
   - Top with tomato sauce
   - Add fresh mozzarella pieces
   - Drizzle with olive oil

4. Baking:
   - Bake at highest oven temperature (450-500°F)
   - Cook for 8-10 minutes until crust is charred
   - Finish with fresh basil leaves`,

      'butter chicken': `For authentic Indian Butter Chicken:

1. Marinade:
   - Mix chicken with yogurt, garam masala, turmeric
   - Marinate for 4-6 hours

2. Sauce:
   - Sauté onions until golden
   - Add tomato puree, cream, butter
   - Mix in spices: garam masala, kashmiri chili
   - Simmer for 20 minutes

3. Cooking:
   - Grill marinated chicken until charred
   - Add to simmering sauce
   - Cook for 10-15 minutes
   - Finish with kasuri methi and cream

Serve hot with naan bread and rice.`,

      'sushi': `For perfect Sushi rolls:

1. Rice preparation:
   - Rinse rice until water runs clear
   - Cook with 1:1.2 ratio rice to water
   - Season with rice vinegar mixture
   - Fan while cooling

2. Assembly:
   - Place nori on bamboo mat
   - Spread rice evenly
   - Add fillings in center
   - Roll tightly using mat
   - Wet knife between cuts

3. Tips:
   - Use short-grain sushi rice
   - Don't overfill rolls
   - Keep hands wet while handling rice`,

      'ramen': `For authentic Japanese Ramen:

1. Broth (6-8 hours):
   - Simmer pork bones
   - Add kombu and dried mushrooms
   - Season with soy sauce and mirin

2. Toppings:
   - Chashu pork (braised belly)
   - Soft-boiled marinated eggs
   - Bamboo shoots
   - Green onions

3. Assembly:
   - Cook fresh noodles
   - Add hot broth
   - Arrange toppings
   - Finish with nori and oil`,
    };
    return recipes[name.toLowerCase()] || "I'd be happy to help you make that dish! What specific recipe would you like to learn?";
  },
  
  getCookingTip: (ingredient: string) => {
    const tips = {
      'rice': `Perfect Rice Tips:
1. Rinse until water runs clear
2. Use 1:1.5 ratio (rice:water)
3. Rest 10 minutes after cooking
4. Fluff with fork, don't stir`,

      'pasta': `Pasta Cooking Guide:
1. Use plenty of water (1L per 100g)
2. Salt water generously
3. Stir during first 2 minutes
4. Reserve pasta water for sauce
5. Cook until al dente`,

      'meat': `Meat Cooking Tips:
1. Bring to room temperature
2. Pat dry before cooking
3. Preheat pan until very hot
4. Let rest after cooking
5. Cut against the grain`,

      'vegetables': `Vegetable Cooking Tips:
1. Don't overcrowd the pan
2. High heat for stir-frying
3. Season after cooking for crisp texture
4. Blanch to preserve color`,

      'fish': `Fish Cooking Guide:
1. Pat dry thoroughly
2. Season just before cooking
3. Hot pan, cold oil
4. Cook skin side first
5. Don't overcook`,
    };
    return tips[ingredient.toLowerCase()] || "I can provide cooking tips for that ingredient. What would you like to know specifically?";
  },

  getGeneralTips: () => `Here are some essential cooking tips:

1. Knife Skills:
   - Keep knives sharp
   - Use claw grip for safety
   - Let knife do the work

2. Temperature:
   - Preheat pans properly
   - Use medium heat most times
   - Rest meats before cutting

3. Seasoning:
   - Season in layers
   - Taste as you cook
   - Salt enhances flavors

4. Organization:
   - Mise en place before cooking
   - Clean as you go
   - Read recipe completely`,
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

  const processUserInput = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for recipe requests
    if (lowerInput.includes('recipe for') || lowerInput.includes('how to make')) {
      const dish = lowerInput
        .replace('recipe for', '')
        .replace('how to make', '')
        .replace('how do i make', '')
        .trim();
      return recipeDatabase.getRecipeByName(dish);
    }
    
    // Check for cooking tips
    if (lowerInput.includes('how do i cook') || lowerInput.includes('tips for cooking')) {
      const ingredient = lowerInput
        .replace('how do i cook', '')
        .replace('tips for cooking', '')
        .trim();
      return recipeDatabase.getCookingTip(ingredient);
    }

    // Check for general cooking questions
    if (lowerInput.includes('cooking tips') || lowerInput.includes('kitchen tips')) {
      return recipeDatabase.getGeneralTips();
    }

    // Default response
    return `I'm your culinary assistant! I can help you with:
1. Specific recipes (e.g., "How to make pizza")
2. Cooking techniques (e.g., "How do I cook rice")
3. General cooking tips

What would you like to learn?`;
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

    // Process the user's input and get response
    const botResponse = processUserInput(messageText);

    setTimeout(() => {
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
                placeholder="Ask about any recipe or cooking tip..."
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