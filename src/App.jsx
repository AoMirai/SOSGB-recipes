import { useState } from 'react'
import './App.css'
import recipies from './assets/recipes';
import { ingredients } from './assets/ingredients';
import Gallery from './components/Gallery';
import RecipeDetails from './components/RecipeDetails';
import IngredientDetails from './components/IngredientDetails';
import RecipeSearch from './components/RecipeSearch';
import Tabs from './components/Tabs';
import { 
  filterRecipesBySpecificIngredient, 
  filterRecipesByChoiceIngredient, 
  filterRecipesByArrangement,
  findRecipeByName,
  findIngredientByName,
  getImageUrl
} from './assets/helpers';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [activeTab, setActiveTab] = useState('recipes');
  const [selectedSearchIngredients, setSelectedSearchIngredients] = useState([]);

  const getRecipesAsSpecificIngredient = (ingredientName) => {
    return filterRecipesBySpecificIngredient(recipies, ingredientName);
  };

  const getRecipesAsChoiceIngredient = (ingredientName) => {
    return filterRecipesByChoiceIngredient(recipies, ingredientName);
  };

  const getRecipesAsArrangement = (ingredientName) => {
    return filterRecipesByArrangement(recipies, ingredientName);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedRecipe(null);
    setSelectedIngredient(null);
  };

  const handleIngredientClick = (ingredientName) => {
    // D'abord vérifier si c'est une recette
    const recipe = findRecipeByName(ingredientName, recipies);
    if (recipe) {
      setActiveTab('recipes');
      setSelectedRecipe(recipe);
      setSelectedIngredient(null);
      return;
    }
    
    // Sinon chercher dans les ingrédients
    const ingredient = findIngredientByName(ingredientName);
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
              imagePath={getImageUrl('')}
            />
            <RecipeDetails 
              recipe={selectedRecipe} 
              onIngredientClick={handleIngredientClick}
              onRecipeClick={handleRecipeClick}
            />
          </>
        ) : activeTab === 'ingredients' ? (
          <>
            <Gallery 
              items={ingredients} 
              onItemClick={setSelectedIngredient}
              imagePath={getImageUrl('')}
            />
            <IngredientDetails 
              ingredient={selectedIngredient}
              recipesAsSpecific={selectedIngredient ? getRecipesAsSpecificIngredient(selectedIngredient.name) : []}
              recipesAsChoice={selectedIngredient ? getRecipesAsChoiceIngredient(selectedIngredient.name) : []}
              recipesAsArrangement={selectedIngredient ? getRecipesAsArrangement(selectedIngredient.name) : []}
              onRecipeClick={handleRecipeClick}
            />
          </>
        ) : (
          <RecipeSearch 
            recipes={recipies} 
            onRecipeClick={handleRecipeClick}
            selectedIngredients={selectedSearchIngredients}
            onIngredientsChange={setSelectedSearchIngredients}
          />
        )}
      </div>
    </div>
  )
}

export default App
