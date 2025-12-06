function Ingredient({ name, type = 'ingredient' }) {
  return (
    <div className={type}>
      <div className='image'>
        <img 
          src={`/pictures/${name.toLowerCase().replaceAll(' ', '_')}.jpg`} 
          alt="" 
        />
      </div>
      <span className='tooltip'>{name}</span>
    </div>
  );
}

export default Ingredient;
