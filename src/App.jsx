import { useState } from 'react'
import './App.css'
import recipies from './assets/recipes';
import { ingredients } from './assets/ingredients';
import Gallery from './components/Gallery';
import RecipeDetails from './components/RecipeDetails';
import IngredientDetails from './components/IngredientDetails';
import Tabs from './components/Tabs';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [activeTab, setActiveTab] = useState('recipes');

  const getRecipesAsSpecificIngredient = (ingredientName) => {
    return recipies.filter(recipe => {
      return recipe.ingredients.some(ing => {
        // Seulement les ingrédients spécifiques (string), pas les arrays
        return typeof ing === 'string' && ing.toLowerCase() === ingredientName.toLowerCase();
      });
    });
  };

  const getRecipesAsChoiceIngredient = (ingredientName) => {
    return recipies.filter(recipe => {
      return recipe.ingredients.some(ing => {
        // Seulement les choix (arrays)
        return Array.isArray(ing) && ing.some(i => i.toLowerCase() === ingredientName.toLowerCase());
      });
    });
  };

  const getRecipesAsArrangement = (ingredientName) => {
    return recipies.filter(recipe => {
      return recipe.arrangements.some(arr => 
        arr.toLowerCase() === ingredientName.toLowerCase()
      );
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null);
    setSelectedIngredient(null);
  };

  const handleIngredientClick = (ingredientName) => {
    // D'abord vérifier si c'est une recette
    const recipe = recipies.find(r => r.name.toLowerCase() === ingredientName.toLowerCase());
    if (recipe) {
      setActiveTab('recipes');
      setSelectedRecipe(recipe);
      setSelectedIngredient(null);
      return;
    }
    
    // Sinon chercher dans les ingrédients
    const ingredient = ingredients.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());
    if (ingredient) {
      setActiveTab('ingredients');
      setSelectedIngredient(ingredient);
      setSelectedRecipe(null);
    }
  };

  const handleRecipeClick = (recipe) => {
    setActiveTab('recipes');
    setSelectedRecipe(recipe);
    setSelectedIngredient(null);
  };

  return (
    <div className="App">
      <h1>Recipe List</h1>
      
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className='app-container'>
        {activeTab === 'recipes' ? (
          <>
            <Gallery 
              items={recipies} 
              onItemClick={setSelectedRecipe}
              imagePath='/pictures/'
            />
            <RecipeDetails recipe={selectedRecipe} onIngredientClick={handleIngredientClick} />
          </>
        ) : (
          <>
            <Gallery 
              items={ingredients} 
              onItemClick={setSelectedIngredient}
              imagePath='/pictures/'
            />
            <IngredientDetails 
              ingredient={selectedIngredient}
              recipesAsSpecific={selectedIngredient ? getRecipesAsSpecificIngredient(selectedIngredient.name) : []}
              recipesAsChoice={selectedIngredient ? getRecipesAsChoiceIngredient(selectedIngredient.name) : []}
              recipesAsArrangement={selectedIngredient ? getRecipesAsArrangement(selectedIngredient.name) : []}
              onRecipeClick={handleRecipeClick}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
