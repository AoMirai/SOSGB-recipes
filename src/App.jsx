import { useState } from 'react'
import './App.css'
import recipies from './assets/recipes';
import Ingredient from './components/Ingredient';

function App() {

  return (
    <>
      <div className="App">
        <h1>Recipe List</h1>
        <div className='recipes'>
          {recipies.map((recipe, index) => (
            <div key={index} className='recipe'>
              <div className='image'>
                <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
              </div>
              <div>{recipe.name}</div>
              <div className='title'>Ingredients: </div>
              <div className='ingredients'>
                {recipe.ingredients.map(ingredient => {
              if (typeof ingredient === 'string') { 
                return <Ingredient key={ingredient} name={ingredient} />
              } else {
                return (
                  <div className='choices'>
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
              {recipe.arrangements.map(arrangement => (
                <Ingredient key={arrangement} name={arrangement} type='arrangement' />
              ))}
              </div>
              <div>Category: {recipe.category}</div>
              <div>Price: {recipe.price}</div>
              <div>Bonus: {recipe.bonus}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
