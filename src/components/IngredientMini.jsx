import { getItemImage, getImageUrl } from '../assets/helpers';

function IngredientMini({ name, missing = false, recipes }) {
  const imgSrc = getItemImage(name, recipes);
  
  return (
    <div className={`ingredient-mini ${missing ? 'missing' : ''}`}>
      <div className='image-mini'>
        <img src={getImageUrl(imgSrc)} alt={name} />
      </div>
    </div>
  );
}

export default IngredientMini;
