function Gallery({ items, onItemClick, imagePath = '/pictures/' }) {
  return (
    <div className='recipes-gallery'>
      {items.map((item, index) => (
        <div 
          key={index} 
          className='recipe-thumbnail'
          onClick={() => onItemClick(item)}
        >
          <div className='image'>
            <img src={`${imagePath}${item.image}`} alt={item.name} />
          </div>
          <span className='tooltip'>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
