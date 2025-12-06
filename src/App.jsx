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

  const getRecipesAsIngredient = (ingredientName) => {
    return recipies.filter(recipe => {
      return recipe.ingredients.some(ing => {
        if (typeof ing === 'string') {
          return ing.toLowerCase() === ingredientName.toLowerCase();
        } else {
          return ing.some(i => i.toLowerCase() === ingredientName.toLowerCase());
        }
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
            <RecipeDetails recipe={selectedRecipe} />
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
              recipesAsIngredient={selectedIngredient ? getRecipesAsIngredient(selectedIngredient.name) : []}
              recipesAsArrangement={selectedIngredient ? getRecipesAsArrangement(selectedIngredient.name) : []}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
