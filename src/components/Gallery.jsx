import { useState, useMemo } from 'react';

function Gallery({ items, onItemClick, imagePath = '/pictures/' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const search = searchTerm.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(search));
  }, [items, searchTerm]);

  return (
    <div className='recipes-gallery'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxSizing: 'border-box',
          marginBottom: '10px'
        }}
      />
      {filteredItems.map((item, index) => (
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
