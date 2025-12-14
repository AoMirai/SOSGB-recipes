import { useState, useMemo } from 'react';
import SearchInput from './SearchInput';
import Thumbnail from './Thumbnail';

function Gallery({ items, onItemClick, imagePath = '/pictures/' }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const search = searchTerm.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(search));
  }, [items, searchTerm]);

  return (
    <div className='recipes-gallery'>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      {filteredItems.map((item, index) => (
        <Thumbnail 
          key={index}
          item={item}
          imagePath={imagePath}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}

export default Gallery;
