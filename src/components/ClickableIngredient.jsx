import Ingredient from './Ingredient';

function ClickableIngredient({ name, type = 'ingredient', onClick }) {
  return (
    <div onClick={() => onClick(name)} style={{cursor: 'pointer'}}>
      <Ingredient name={name} type={type} />
    </div>
  );
}

export default ClickableIngredient;
