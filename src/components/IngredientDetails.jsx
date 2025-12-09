function IngredientDetails({ ingredient, recipesAsSpecific, recipesAsChoice, recipesAsArrangement, onRecipeClick }) {
  if (!ingredient) {
    return (
      <div className='recipe-details placeholder'>
        <p>Select an ingredient to see details</p>
      </div>
    );
  }

  const hasSpecificRecipes = recipesAsSpecific.length > 0;
  const hasChoiceRecipes = recipesAsChoice.length > 0;
  const hasArrangementRecipes = recipesAsArrangement.length > 0;

  return (
    <div className='recipe-details'>
      <div className='recipe-header'>
        <div className='image-large'>
          <img src={import.meta.env.BASE_URL +`/pictures/${ingredient.image}`} alt={ingredient.name} />
        </div>
        <h2>{ingredient.name}</h2>
      </div>
      
      {hasSpecificRecipes && (
        <>
          <div className='title'>Used as specific ingredient: </div>
          <div className='recipes-list'>
            {recipesAsSpecific.map(recipe => (
              <div 
                key={recipe.name} 
                className='ingredient' 
                onClick={() => onRecipeClick(recipe)}
                style={{cursor: 'pointer'}}
              >
                <div className='image'>
                  <img src={import.meta.env.BASE_URL +`/pictures/${recipe.image}`} alt={recipe.name} />
                </div>
                <span className='tooltip'>{recipe.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {hasChoiceRecipes && (
        <>
          <div className='title'>Used as ingredient choice: </div>
          <div className='recipes-list'>
            {recipesAsChoice.map(recipe => (
              <div 
                key={recipe.name} 
                className='ingredient' 
                onClick={() => onRecipeClick(recipe)}
                style={{cursor: 'pointer'}}
              >
                <div className='image'>
                  <img src={import.meta.env.BASE_URL +`/pictures/${recipe.image}`} alt={recipe.name} />
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
              <div 
                key={recipe.name} 
                className='ingredient'
                onClick={() => onRecipeClick(recipe)}
                style={{cursor: 'pointer'}}
              >
                <div className='image'>
                  <img src={import.meta.env.BASE_URL +`/pictures/${recipe.image}`} alt={recipe.name} />
                </div>
                <span className='tooltip'>{recipe.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      
      {!hasSpecificRecipes && !hasChoiceRecipes && !hasArrangementRecipes && (
        <p>No recipes use this ingredient</p>
      )}
    </div>
  );
}

export default IngredientDetails;
