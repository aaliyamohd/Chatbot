import React from 'react';
import { Clock, Users, ChefHat, X } from 'lucide-react';
import type { Recipe } from '../types/recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="aspect-video mb-6">
            {recipe.videoUrl ? (
              <iframe
                src={recipe.videoUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            ) : (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Total Time</p>
                <p className="font-semibold">{recipe.prepTime + recipe.cookTime} min</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <ChefHat className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className="font-semibold capitalize">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Instructions</h3>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Nutritional Information</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-semibold">{recipe.nutritionalInfo.calories}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="font-semibold">{recipe.nutritionalInfo.protein}g</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="font-semibold">{recipe.nutritionalInfo.carbs}g</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="font-semibold">{recipe.nutritionalInfo.fat}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}