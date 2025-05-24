export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  dietaryInfo: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  image: string;
  videoUrl?: string;
  mood: string[];
  timeOfDay: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
  weather: ('hot' | 'cold' | 'rainy' | 'sunny')[];
  rating: number;
}