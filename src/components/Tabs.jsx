function Tabs({ activeTab, onTabChange }) {
  return (
    <div className='tabs'>
      <button 
        className={activeTab === 'recipes' ? 'tab active' : 'tab'}
        onClick={() => onTabChange('recipes')}
      >
        Recipes
      </button>
      <button 
        className={activeTab === 'ingredients' ? 'tab active' : 'tab'}
        onClick={() => onTabChange('ingredients')}
      >
        Ingredients
      </button>
    </div>
  );
}

export default Tabs;
