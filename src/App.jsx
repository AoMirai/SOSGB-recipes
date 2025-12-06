import { useState } from 'react'
import './App.css'
import recipies from './assets/recipes';
import Ingredient from './components/Ingredient';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <div className="App">
        <h1>Recipe List</h1>
        <div className='app-container'>
          <div className='recipes-gallery'>
            {recipies.map((recipe, index) => (
              <div 
                key={index} 
                className='recipe-thumbnail'
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className='image'>
                  <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
                </div>
                <span className='tooltip'>{recipe.name}</span>
              </div>
            ))}
          </div>
          
          {selectedRecipe && (
            <div className='recipe-details'>
              <div className='recipe-header'>
                <div className='image-large'>
                  <img src={`/pictures/${selectedRecipe.image}`} alt={selectedRecipe.name} />
                </div>
                <h2>{selectedRecipe.name}</h2>
              </div>
              
              <div className='title'>Ingredients: </div>
              <div className='ingredients'>
                {selectedRecipe.ingredients.map((ingredient, idx) => {
                  if (typeof ingredient === 'string') { 
                    return <Ingredient key={ingredient} name={ingredient} />
                  } else {
                    return (
                      <div key={idx} className='choices'>
                        {ingredient.map(ingr => 
                          <Ingredient key={ingr} name={ingr} />
                        )}
                      </div>
                    )
                  }
                })}
              </div>
              
              <div className='title'>Arrangements: </div>
              <div className='arrangements'>
                {selectedRecipe.arrangements.map(arrangement => (
                  <Ingredient key={arrangement} name={arrangement} type='arrangement' />
                ))}
              </div>
              
              <div className='recipe-info'>
                <div>Category: {selectedRecipe.category}</div>
                <div>Price: {selectedRecipe.price}</div>
                <div>Bonus: {selectedRecipe.bonus}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
