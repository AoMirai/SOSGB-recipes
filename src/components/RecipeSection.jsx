import RecipeItem from './RecipeItem';

function RecipeSection({ title, recipes, onRecipeClick }) {
  return (
    <>
      <div className='title'>{title}</div>
      <div className='recipes-list'>
        {recipes.map(recipe => (
          <RecipeItem key={recipe.name} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </div>
    </>
  );
}

export default RecipeSection;
