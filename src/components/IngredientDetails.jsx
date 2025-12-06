function IngredientDetails({ ingredient, recipesAsIngredient, recipesAsArrangement }) {
  if (!ingredient) {
    return (
      <div className='recipe-details placeholder'>
        <p>Select an ingredient to see details</p>
      </div>
    );
  }

  const hasIngredientRecipes = recipesAsIngredient.length > 0;
  const hasArrangementRecipes = recipesAsArrangement.length > 0;

  return (
    <div className='recipe-details'>
      <div className='recipe-header'>
        <div className='image-large'>
          <img src={`/pictures/${ingredient.image}`} alt={ingredient.name} />
        </div>
        <h2>{ingredient.name}</h2>
      </div>
      
      {hasIngredientRecipes && (
        <>
          <div className='title'>Used as ingredient: </div>
          <div className='recipes-list'>
            {recipesAsIngredient.map(recipe => (
              <div key={recipe.name} className='ingredient'>
                <div className='image'>
                  <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
                </div>
                <span className='tooltip'>{recipe.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {hasArrangementRecipes && (
        <>
          <div className='title'>Used as arrangement: </div>
          <div className='recipes-list'>
            {recipesAsArrangement.map(recipe => (
              <div key={recipe.name} className='ingredient'>
                <div className='image'>
                  <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
                </div>
                <span className='tooltip'>{recipe.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {!hasIngredientRecipes && !hasArrangementRecipes && (
        <p>No recipes use this ingredient</p>
      )}
    </div>
  );
}

export default IngredientDetails;
