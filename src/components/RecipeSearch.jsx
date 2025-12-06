import { useState, useMemo } from 'react';
import { ingredients } from '../assets/ingredients';

function RecipeSearch({ recipes, onRecipeClick, selectedIngredients = [], onIngredientsChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('profitability'); // 'profitability' ou 'price'

  // Créer des Maps pour accès O(1) au lieu de .find() O(n)
  const ingredientPriceMap = useMemo(() => {
    const map = new Map();
    ingredients.forEach(ing => {
      map.set(ing.name.toLowerCase(), ing.price || 0);
    });
    return map;
  }, []);

  const recipePriceMap = useMemo(() => {
    const map = new Map();
    recipes.forEach(rec => {
      map.set(rec.name.toLowerCase(), rec.price);
    });
    return map;
  }, [recipes]);

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.find(i => i.name === ingredient.name)) {
      onIngredientsChange(selectedIngredients.filter(i => i.name !== ingredient.name));
    } else {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  const clearSelection = () => {
    onIngredientsChange([]);
  };

  // Filtrer les ingrédients par recherche
  const filteredIngredients = useMemo(() => 
    ingredients.filter(ing => 
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  // Calculer les recettes possibles avec les ingrédients sélectionnés
  const possibleRecipes = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    // Créer un Set pour recherche O(1)
    const selectedNamesSet = new Set(selectedIngredients.map(i => i.name.toLowerCase()));

    return recipes
      .map(recipe => {
        let matchedIngredients = 0;
        let totalIngredients = 0;
        let missingIngredients = [];
        let usedIngredientsList = [];
        let missingIngredientsList = [];

        // Compter les ingrédients principaux
        recipe.ingredients.forEach(ing => {
          if (typeof ing === 'string') {
            totalIngredients++;
            const ingLower = ing.toLowerCase();
            if (selectedNamesSet.has(ingLower)) {
              matchedIngredients++;
              usedIngredientsList.push(ing);
            } else {
              missingIngredients.push(ing);
              missingIngredientsList.push(ing);
            }
          } else {
            // Pour les choix, vérifier si au moins un est disponible
            totalIngredients++;
            const matchedChoice = ing.find(i => selectedNamesSet.has(i.toLowerCase()));
            if (matchedChoice) {
              matchedIngredients++;
              usedIngredientsList.push(matchedChoice);
            } else {
              missingIngredients.push(`One of: ${ing.join(', ')}`);
              missingIngredientsList.push(...ing);
            }
          }
        });

        // Vérifier les arrangements
        const usedArrangements = [];
        const missingArrangements = [];
        recipe.arrangements.forEach(arr => {
          if (selectedNamesSet.has(arr.toLowerCase())) {
            usedArrangements.push(arr);
          } else {
            missingArrangements.push(arr);
          }
        });

        const matchPercentage = totalIngredients > 0 ? (matchedIngredients / totalIngredients) * 100 : 0;
        
        // Early return si aucun match
        if (matchPercentage === 0) return null;

        const usedIngredientsCount = usedIngredientsList.length + usedArrangements.length;

        return {
          recipe,
          matchPercentage,
          matchedIngredients,
          totalIngredients,
          missingIngredients,
          usedIngredientsCount,
          canMake: matchPercentage === 100,
          usedIngredientsList,
          usedArrangements,
          missingIngredientsList,
          missingArrangements
        };
      })
      .filter(r => r !== null) // Filtrer les recettes sans match
      .sort((a, b) => {
        // Trier par: 1) recettes complètes d'abord
        if (a.canMake !== b.canMake) return a.canMake ? -1 : 1;
        
        // 2) Selon le critère de tri choisi
        if (sortBy === 'profitability') {
          const profitA = a.recipe.profitability || 0;
          const profitB = b.recipe.profitability || 0;
          if (Math.abs(profitA - profitB) > 0.01) {
            return profitB - profitA;
          }
        } else if (sortBy === 'price') {
          if (a.recipe.price !== b.recipe.price) {
            return b.recipe.price - a.recipe.price;
          }
        }
        
        // 3) Par % de match
        return b.matchPercentage - a.matchPercentage;
      });
  }, [selectedIngredients, sortBy, recipes]);

  return (
    <div className='recipe-search-container'>
      <div className='search-panel'>
        <div className='panel-header'>
          <h2>Select Ingredients</h2>
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
        </div>

        <div className='ingredients-selection-container'>
          <div className='selected-ingredients'>
            <div className='selected-header'>
              <span>Selected ({selectedIngredients.length})</span>
              {selectedIngredients.length > 0 && (
                <button onClick={clearSelection} className='clear-btn'>Clear All</button>
              )}
            </div>
            <div className='selected-list'>
              {selectedIngredients.map(ing => (
                <div key={ing.name} className='selected-ingredient-chip'>
                  <span>{ing.name}</span>
                  <button onClick={() => toggleIngredient(ing)}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className='ingredients-grid'>
            {filteredIngredients.map(ing => {
              const isSelected = selectedIngredients.find(i => i.name === ing.name);
              return (
                <div
                  key={ing.name}
                  className={`ingredient-selector ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleIngredient(ing)}
                >
                  <div className='image'>
                    <img src={`/pictures/${ing.image}`} alt={ing.name} />
                  </div>
                  <span className='tooltip'>{ing.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='results-panel'>
        <div className='panel-header'>
          <h2>Possible Recipes ({possibleRecipes.length})</h2>
          <div className='sort-selector'>
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='sort-select'>
              <option value="profitability">Profitability</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        
        {selectedIngredients.length === 0 ? (
          <p className='placeholder-text'>Select ingredients to see possible recipes</p>
        ) : (
          <div className='recipe-results'>
            {possibleRecipes.map(({ recipe, matchPercentage, matchedIngredients, totalIngredients, missingIngredients, usedIngredientsCount, canMake, usedIngredientsList, usedArrangements, missingIngredientsList, missingArrangements }) => (
              <div 
                key={recipe.name} 
                className={`recipe-result-card ${canMake ? 'complete' : ''}`}
                onClick={() => onRecipeClick(recipe)}
              >
                <div className='recipe-result-image'>
                  <div className='image'>
                    <img src={`/pictures/${recipe.image}`} alt={recipe.name} />
                  </div>
                </div>
                <div className='recipe-result-info'>
                  <h3>{recipe.name}</h3>
                  <div className='recipe-stats'>
                    <div className='stat'>
                      <span className='stat-label'>Match:</span>
                      <span className={`stat-value ${canMake ? 'complete' : ''}`}>
                        {matchedIngredients}/{totalIngredients} ({matchPercentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className='stat'>
                      <span className='stat-label'>Profitability:</span>
                      <span className='stat-value'>
                        {recipe.profitability || 0}G
                      </span>
                    </div>
                    <div className='stat'>
                      <span className='stat-label'>Price:</span>
                      <span className='stat-value'>{recipe.price}G</span>
                    </div>
                    <div className='stat'>
                      <span className='stat-label'>Bonus:</span>
                      <span className='stat-value'>{recipe.bonus}</span>
                    </div>
                  </div>
                  
                  {/* Afficher les ingrédients utilisés */}
                  <div className='recipe-ingredients-display'>
                    <div className='ingredients-list'>
                      {usedIngredientsList.map((ing, idx) => {
                        const ingredient = ingredients.find(i => i.name.toLowerCase() === ing.toLowerCase());
                        const isRecipe = recipes.find(r => r.name.toLowerCase() === ing.toLowerCase());
                        const imgSrc = ingredient ? ingredient.image : isRecipe?.image;
                        return (
                          <div key={`used-ing-${idx}`} className='ingredient-mini'>
                            <div className='image-mini'>
                              <img src={`/pictures/${imgSrc}`} alt={ing} />
                            </div>
                          </div>
                        );
                      })}
                      {missingIngredientsList.map((ing, idx) => {
                        const ingredient = ingredients.find(i => i.name.toLowerCase() === ing.toLowerCase());
                        const isRecipe = recipes.find(r => r.name.toLowerCase() === ing.toLowerCase());
                        const imgSrc = ingredient ? ingredient.image : isRecipe?.image;
                        return (
                          <div key={`missing-ing-${idx}`} className='ingredient-mini missing'>
                            <div className='image-mini'>
                              <img src={`/pictures/${imgSrc}`} alt={ing} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {(usedArrangements.length > 0 || missingArrangements.length > 0) && (
                      <div className='arrangements-list'>
                        {usedArrangements.map((arr, idx) => {
                          const ingredient = ingredients.find(i => i.name.toLowerCase() === arr.toLowerCase());
                          const isRecipe = recipes.find(r => r.name.toLowerCase() === arr.toLowerCase());
                          const imgSrc = ingredient ? ingredient.image : isRecipe?.image;
                          return (
                            <div key={`used-arr-${idx}`} className='ingredient-mini'>
                              <div className='image-mini'>
                                <img src={`/pictures/${imgSrc}`} alt={arr} />
                              </div>
                            </div>
                          );
                        })}
                        {missingArrangements.map((arr, idx) => {
                          const ingredient = ingredients.find(i => i.name.toLowerCase() === arr.toLowerCase());
                          const isRecipe = recipes.find(r => r.name.toLowerCase() === arr.toLowerCase());
                          const imgSrc = ingredient ? ingredient.image : isRecipe?.image;
                          return (
                            <div key={`missing-arr-${idx}`} className='ingredient-mini missing'>
                              <div className='image-mini'>
                                <img src={`/pictures/${imgSrc}`} alt={arr} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeSearch;
