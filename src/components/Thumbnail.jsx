function Thumbnail({ item, imagePath, onClick }) {
  return (
    <div 
      className='recipe-thumbnail'
      onClick={() => onClick(item)}
    >
      <div className='image'>
        <img src={`${imagePath}${item.image}`} alt={item.name} />
      </div>
      <span className='tooltip'>{item.name}</span>
    </div>
  );
}

export default Thumbnail;
