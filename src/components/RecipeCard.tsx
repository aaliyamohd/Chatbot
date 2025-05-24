import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(recipe)}
    >
      <div className="relative h-48">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full">
          <span className="text-yellow-500">★</span> {recipe.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="w-4 h-4 mr-1" />
            <span className="capitalize">{recipe.difficulty}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.dietaryInfo.vegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Vegetarian</span>
          )}
          {recipe.dietaryInfo.vegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Vegan</span>
          )}
          {recipe.dietaryInfo.glutenFree && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Gluten-free</span>
          )}
        </div>
      </div>
    </div>
  );
}