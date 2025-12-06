import Ingredient from './Ingredient';

function RecipeDetails({ recipe }) {
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
        {recipe.arrangements.map(arrangement => (
          <Ingredient key={arrangement} name={arrangement} type='arrangement' />
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
