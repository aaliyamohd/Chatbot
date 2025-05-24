import React, { useState } from 'react';
import { Search, Sun, Cloud, CloudRain, Thermometer } from 'lucide-react';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { ChatBot } from './components/ChatBot';
import type { Recipe } from './types/recipe';

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Comforting Chicken Noodle Soup',
    description: 'A classic comfort food perfect for cold days or when you\'re feeling under the weather.',
    ingredients: [
      '2 chicken breasts',
      '8 cups chicken broth',
      '2 carrots, sliced',
      '2 celery stalks, sliced',
      '1 onion, diced',
      '8 oz egg noodles',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large pot, bring chicken broth to a boil.',
      'Add chicken breasts and cook for 15-20 minutes.',
      'Remove chicken and shred it using two forks.',
      'Add vegetables to the broth and simmer for 5-7 minutes.',
      'Add egg noodles and cook until tender, about 6-8 minutes.',
      'Return shredded chicken to the pot.',
      'Season with salt and pepper to taste.'
    ],
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    difficulty: 'easy',
    cuisine: 'American',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true
    },
    nutritionalInfo: {
      calories: 280,
      protein: 25,
      carbs: 30,
      fat: 8
    },
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg',
    mood: ['under the weather', 'cozy', 'comfort'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['cold', 'rainy'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A vibrant and healthy bowl packed with Mediterranean flavors and fresh vegetables.',
    ingredients: [
      '1 cup quinoa',
      'Cherry tomatoes',
      'Cucumber',
      'Kalamata olives',
      'Feta cheese',
      'Red onion',
      'Extra virgin olive oil',
      'Lemon juice'
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop vegetables into bite-sized pieces',
      'Combine all ingredients in a bowl',
      'Drizzle with olive oil and lemon juice',
      'Season with salt and pepper'
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mediterranean',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14
    },
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    mood: ['healthy', 'light', 'fresh'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['hot', 'sunny'],
    rating: 4.6
  },
  {
    id: '3',
    name: 'Spicy Thai Basil Stir-Fry',
    description: 'A quick and flavorful stir-fry with aromatic Thai basil and your choice of protein.',
    ingredients: [
      '400g chicken/tofu',
      'Thai basil leaves',
      'Garlic cloves',
      'Thai chilies',
      'Soy sauce',
      'Fish sauce',
      'Oyster sauce',
      'Vegetable oil'
    ],
    instructions: [
      'Heat oil in a wok over high heat',
      'Add garlic and chilies, stir-fry until fragrant',
      'Add protein of choice, cook until done',
      'Add sauces and stir to combine',
      'Toss in Thai basil leaves',
      'Serve hot with steamed rice'
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    cuisine: 'Thai',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true
    },
    nutritionalInfo: {
      calories: 380,
      protein: 28,
      carbs: 15,
      fat: 18
    },
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    mood: ['energetic', 'adventurous'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['hot', 'sunny'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Authentic Indian Butter Chicken',
    description: 'Rich and creamy curry with tender chicken pieces in a tomato-based sauce.',
    ingredients: [
      '800g chicken thighs',
      'Yogurt for marinade',
      'Garam masala',
      'Butter',
      'Heavy cream',
      'Tomato puree',
      'Kashmiri red chili powder',
      'Fenugreek leaves'
    ],
    instructions: [
      'Marinate chicken in yogurt and spices for 4 hours',
      'Cook chicken in a tandoor or oven until charred',
      'Prepare sauce with butter, tomatoes, and spices',
      'Add cream and simmer',
      'Combine chicken with sauce',
      'Garnish with cream and fenugreek'
    ],
    prepTime: 240,
    cookTime: 45,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'Indian',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: false
    },
    nutritionalInfo: {
      calories: 450,
      protein: 32,
      carbs: 12,
      fat: 28
    },
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    mood: ['indulgent', 'cozy'],
    timeOfDay: ['dinner'],
    weather: ['cold', 'rainy'],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Japanese Ramen Bowl',
    description: 'Authentic Japanese ramen with rich broth, fresh noodles, and traditional toppings.',
    ingredients: [
      'Fresh ramen noodles',
      'Pork belly',
      'Soy sauce',
      'Mirin',
      'Kombu',
      'Bonito flakes',
      'Soft-boiled eggs',
      'Nori sheets'
    ],
    instructions: [
      'Prepare broth with kombu and bonito',
      'Cook pork belly until tender',
      'Soft-boil eggs and marinate',
      'Cook fresh ramen noodles',
      'Assemble bowl with broth, noodles, and toppings',
      'Garnish with nori and green onions'
    ],
    prepTime: 30,
    cookTime: 180,
    servings: 4,
    difficulty: 'hard',
    cuisine: 'Japanese',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true
    },
    nutritionalInfo: {
      calories: 520,
      protein: 28,
      carbs: 65,
      fat: 22
    },
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    mood: ['comfort', 'cozy'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['cold', 'rainy'],
    rating: 4.8
  },
  {
    id: '6',
    name: 'Mexican Street Tacos',
    description: 'Authentic street-style tacos with marinated meat, fresh cilantro, and lime.',
    ingredients: [
      'Corn tortillas',
      'Marinated beef/pork',
      'White onion',
      'Fresh cilantro',
      'Lime wedges',
      'Salsa verde',
      'Guacamole',
      'Radishes'
    ],
    instructions: [
      'Marinate meat with spices',
      'Grill meat until charred',
      'Warm tortillas on griddle',
      'Chop onions and cilantro',
      'Assemble tacos',
      'Serve with lime and salsas'
    ],
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'easy',
    cuisine: 'Mexican',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true
    },
    nutritionalInfo: {
      calories: 320,
      protein: 18,
      carbs: 28,
      fat: 16
    },
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    mood: ['festive', 'casual'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['hot', 'sunny'],
    rating: 4.7
  },
  {
    id: '7',
    name: 'Traditional Italian Margherita Pizza',
    description: 'Authentic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
    ingredients: [
      '00 flour',
      'Fresh yeast',
      'San Marzano tomatoes',
      'Fresh mozzarella',
      'Fresh basil',
      'Extra virgin olive oil',
      'Sea salt'
    ],
    instructions: [
      'Prepare pizza dough and let rise for 24 hours',
      'Shape dough by hand',
      'Top with crushed tomatoes',
      'Add torn mozzarella',
      'Bake in very hot oven',
      'Finish with fresh basil and olive oil'
    ],
    prepTime: 1440,
    cookTime: 5,
    servings: 2,
    difficulty: 'medium',
    cuisine: 'Italian',
    dietaryInfo: {
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    nutritionalInfo: {
      calories: 850,
      protein: 24,
      carbs: 98,
      fat: 32
    },
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    mood: ['casual', 'social'],
    timeOfDay: ['lunch', 'dinner'],
    weather: ['any'],
    rating: 4.9
  },
  {
    id: '8',
    name: 'Greek Moussaka',
    description: 'Layered eggplant casserole with spiced ground meat and béchamel sauce.',
    ingredients: [
      'Eggplants',
      'Ground lamb',
      'Onions',
      'Garlic',
      'Tomato paste',
      'Cinnamon',
      'Milk',
      'Flour',
      'Butter',
      'Eggs'
    ],
    instructions: [
      'Slice and salt eggplants',
      'Prepare meat sauce with spices',
      'Make béchamel sauce',
      'Layer eggplants and meat',
      'Top with béchamel',
      'Bake until golden'
    ],
    prepTime: 60,
    cookTime: 45,
    servings: 8,
    difficulty: 'hard',
    cuisine: 'Greek',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    },
    nutritionalInfo: {
      calories: 420,
      protein: 22,
      carbs: 28,
      fat: 26
    },
    image: 'https://images.pexels.com/photos/6607314/pexels-photo-6607314.jpeg',
    mood: ['comfort', 'indulgent'],
    timeOfDay: ['dinner'],
    weather: ['cold'],
    rating: 4.8
  },
  {
    id: '9',
    name: 'Vietnamese Pho',
    description: 'Traditional beef noodle soup with aromatic broth and fresh herbs.',
    ingredients: [
      'Beef bones',
      'Rice noodles',
      'Bean sprouts',
      'Thai basil',
      'Star anise',
      'Cinnamon stick',
      'Fish sauce',
      'Lime'
    ],
    instructions: [
      'Simmer bones for 6-8 hours',
      'Toast spices and add to broth',
      'Cook rice noodles',
      'Slice beef very thin',
      'Assemble bowls',
      'Serve with herbs and condiments'
    ],
    prepTime: 30,
    cookTime: 480,
    servings: 6,
    difficulty: 'medium',
    cuisine: 'Vietnamese',
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      dairyFree: true
    },
    nutritionalInfo: {
      calories: 380,
      protein: 25,
      carbs: 42,
      fat: 14
    },
    image: 'https://images.pexels.com/photos/1731535/pexels-photo-1731535.jpeg',
    mood: ['comfort', 'healing'],
    timeOfDay: ['breakfast', 'lunch', 'dinner'],
    weather: ['cold', 'rainy'],
    rating: 4.9
  }
];

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  const filteredRecipes = sampleRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWeather = !selectedWeather || recipe.weather.includes(selectedWeather as any);
    
    return matchesSearch && matchesWeather;
  });

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')] bg-fixed bg-cover">
      <div className="min-h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <header className="bg-white bg-opacity-90 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-gray-900 font-serif">Global Recipe Explorer</h1>
            <p className="text-gray-600 mt-2">Discover authentic recipes from around the world</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search global recipes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white bg-opacity-90 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <button
                className={`p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm ${
                  selectedWeather === 'sunny' ? 'bg-yellow-100 text-yellow-800' : 'bg-white bg-opacity-90'
                }`}
                onClick={() => setSelectedWeather(selectedWeather === 'sunny' ? null : 'sunny')}
              >
                <Sun className="w-5 h-5" />
                Sunny
              </button>
              <button
                className={`p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm ${
                  selectedWeather === 'cold' ? 'bg-blue-100 text-blue-800' : 'bg-white bg-opacity-90'
                }`}
                onClick={() => setSelectedWeather(selectedWeather === 'cold' ? null : 'cold')}
              >
                <Thermometer className="w-5 h-5" />
                Cold
              </button>
              <button
                className={`p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm ${
                  selectedWeather === 'rainy' ? 'bg-blue-100 text-blue-800' : 'bg-white bg-opacity-90'
                }`}
                onClick={() => setSelectedWeather(selectedWeather === 'rainy' ? null : 'rainy')}
              >
                <CloudRain className="w-5 h-5" />
                Rainy
              </button>
              <button
                className={`p-3 rounded-lg flex items-center gap-2 backdrop-blur-sm ${
                  selectedWeather === 'hot' ? 'bg-red-100 text-red-800' : 'bg-white bg-opacity-90'
                }`}
                onClick={() => setSelectedWeather(selectedWeather === 'hot' ? null : 'hot')}
              >
                <Cloud className="w-5 h-5" />
                Hot
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={setSelectedRecipe}
              />
            ))}
          </div>

          {selectedRecipe && (
            <RecipeDetail
              recipe={selectedRecipe}
              onClose={() => setSelectedRecipe(null)}
            />
          )}
        </main>
        <ChatBot />
      </div>
    </div>
  );
}

export default App;