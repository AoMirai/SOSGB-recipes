import ClickableIngredient from './ClickableIngredient';
import RecipeItem from './RecipeItem';
import { recipes } from '../assets/recipes';
import { findRecipesUsingRecipe, getImageUrl } from '../assets/helpers';

function RecipeDetails({ recipe, onIngredientClick, onRecipeClick }) {
  if (!recipe) {
    return (
      <div className='recipe-details placeholder'>
        <p>Select a recipe to see details</p>
      </div>
    );
  }

  // Find recipes that use the current recipe as an ingredient
  const usedInRecipes = findRecipesUsingRecipe(recipes, recipe.name);

  return (
    <div className='recipe-details'>
      <div className='recipe-header'>
        <div className='image-large'>
          <img src={getImageUrl(recipe.image)} alt={recipe.name} />
        </div>
        <h2>{recipe.name}</h2>
      </div>
      
      <div className='title'>Ingredients: </div>
      <div className='ingredients'>
        {recipe.ingredients.map((ingredient, idx) => {
          if (typeof ingredient === 'string') { 
            return <ClickableIngredient key={ingredient} name={ingredient} onClick={onIngredientClick} />
          } else {
            return (
              <div key={idx} className='choices'>
                {ingredient.map(ingr => (
                  <ClickableIngredient key={ingr} name={ingr} onClick={onIngredientClick} />
                ))}
              </div>
            )
          }
        })}
      </div>
      
      <div className='title'>Arrangements: </div>
      <div className='arrangements'>
        {recipe.arrangements.map(arrangement => (
          <ClickableIngredient 
            key={arrangement} 
            name={arrangement}
            type='arrangement'
            onClick={onIngredientClick}
          />
        ))}
      </div>
      
      <div className='recipe-info'>
        <div>Category: {recipe.category}</div>
        <div>Price: {recipe.price}</div>
        <div>Bonus: {recipe.bonus}</div>
      </div>

      {usedInRecipes.length > 0 && (
        <>
          <div className='title'>Used in: </div>
          <div className='ingredients'>
            {usedInRecipes.map(usedRecipe => (
              <RecipeItem 
                key={usedRecipe.name}
                recipe={usedRecipe}
                onClick={onRecipeClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetails;
