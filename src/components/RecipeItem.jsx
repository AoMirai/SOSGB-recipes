import { getImageUrl } from '../assets/helpers';

function RecipeItem({ recipe, onClick }) {
  return (
    <div 
      className='ingredient' 
      onClick={() => onClick(recipe)}
      style={{cursor: 'pointer'}}
    >
      <div className='image'>
        <img src={getImageUrl(recipe.image)} alt="" />
      </div>
      <span className='tooltip'>{recipe.name}</span>
    </div>
  );
}

export default RecipeItem;
