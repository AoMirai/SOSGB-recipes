import { getImageUrl } from '../assets/helpers';
import RecipeSection from './RecipeSection';

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
          <img src={getImageUrl(ingredient.image)} alt={ingredient.name} />
        </div>
        <h2>{ingredient.name}</h2>
      </div>
      
      {hasSpecificRecipes && (
        <RecipeSection title="Used as specific ingredient:" recipes={recipesAsSpecific} onRecipeClick={onRecipeClick} />
      )}
      
      {hasChoiceRecipes && (
        <RecipeSection title="Used as ingredient choice:" recipes={recipesAsChoice} onRecipeClick={onRecipeClick} />
      )}
      
      {hasArrangementRecipes && (
        <RecipeSection title="Used as arrangement:" recipes={recipesAsArrangement} onRecipeClick={onRecipeClick} />
      )}
      
      {!hasSpecificRecipes && !hasChoiceRecipes && !hasArrangementRecipes && (
        <p>No recipes use this ingredient</p>
      )}
    </div>
  );
}

export default IngredientDetails;
