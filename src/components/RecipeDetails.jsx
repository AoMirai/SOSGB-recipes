import Ingredient from './Ingredient';

function RecipeDetails({ recipe, onIngredientClick }) {
  if (!recipe) {
    return (
      <div className='recipe-details placeholder'>
        <p>Select a recipe to see details</p>
      </div>
    );
  }

  return (
    <div className='recipe-details'>
      <div className='recipe-header'>
        <div className='image-large'>
          <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
        </div>
        <h2>{recipe.name}</h2>
      </div>
      
      <div className='title'>Ingredients: </div>
      <div className='ingredients'>
        {recipe.ingredients.map((ingredient, idx) => {
          if (typeof ingredient === 'string') { 
            return (
              <div key={ingredient} onClick={() => onIngredientClick(ingredient)} style={{cursor: 'pointer'}}>
                <Ingredient name={ingredient} />
              </div>
            )
          } else {
            return (
              <div key={idx} className='choices'>
                {ingredient.map(ingr => (
                  <div key={ingr} onClick={() => onIngredientClick(ingr)} style={{cursor: 'pointer'}}>
                    <Ingredient name={ingr} />
                  </div>
                ))}
              </div>
            )
          }
        })}
      </div>
      
      <div className='title'>Arrangements: </div>
      <div className='arrangements'>
        {recipe.arrangements.map(arrangement => (
          <div key={arrangement} onClick={() => onIngredientClick(arrangement)} style={{cursor: 'pointer'}}>
            <Ingredient name={arrangement} type='arrangement' />
          </div>
        ))}
      </div>
      
      <div className='recipe-info'>
        <div>Category: {recipe.category}</div>
        <div>Price: {recipe.price}</div>
        <div>Bonus: {recipe.bonus}</div>
      </div>
    </div>
  );
}

export default RecipeDetails;
