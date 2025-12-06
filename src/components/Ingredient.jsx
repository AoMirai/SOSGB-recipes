function Ingredient({ name, type = 'ingredient' }) {
  return (
    <div className={type}>
      <div className='image'>
        <img 
          src={`/pictures/${name.toLowerCase().replace(' ', '_')}.jpg`} 
          alt="" 
        />
      </div>
      <span className='toolpick'>{name}</span>
    </div>
  );
}

export default Ingredient;
