const API_KEY = 'PASTE_YOUR_SPOONACULAR_KEY_HERE';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function fetchRecipes(ingredients) {
  const response = await fetch(
    `${BASE_URL}/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`
  );
  return response.json();
}
