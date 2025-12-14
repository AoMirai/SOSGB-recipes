import { ingredients } from './ingredients';

// Helper pour construire les URLs d'images
export const getImageUrl = (imageName) => {
  return `${import.meta.env.BASE_URL}/pictures/${imageName}`;
};

// Helper pour trouver un ingrédient par nom (insensible à la casse)
export const findIngredientByName = (name) => {
  return ingredients.find(i => i.name.toLowerCase() === name.toLowerCase());
};

// Helper pour trouver une recette par nom (insensible à la casse)
export const findRecipeByName = (name, recipes) => {
  return recipes.find(r => r.name.toLowerCase() === name.toLowerCase());
};

// Helper pour comparer des noms (insensible à la casse)
export const nameMatches = (name1, name2) => {
  return name1.toLowerCase() === name2.toLowerCase();
};

// Helper pour filtrer les recettes qui utilisent un ingrédient spécifique
export const filterRecipesBySpecificIngredient = (recipes, ingredientName) => {
  return recipes.filter(recipe => {
    return recipe.ingredients.some(ing => {
      return typeof ing === 'string' && nameMatches(ing, ingredientName);
    });
  });
};

// Helper pour filtrer les recettes qui ont un ingrédient dans les choix
export const filterRecipesByChoiceIngredient = (recipes, ingredientName) => {
  return recipes.filter(recipe => {
    return recipe.ingredients.some(ing => {
      return Array.isArray(ing) && ing.some(i => nameMatches(i, ingredientName));
    });
  });
};

// Helper pour filtrer les recettes qui utilisent un arrangement
export const filterRecipesByArrangement = (recipes, ingredientName) => {
  return recipes.filter(recipe => {
    return recipe.arrangements.some(arr => nameMatches(arr, ingredientName));
  });
};

// Helper pour trouver les recettes qui utilisent une recette comme ingrédient
export const findRecipesUsingRecipe = (recipes, recipeName) => {
  return recipes.filter(r => {
    return r.ingredients.some(ing => {
      if (typeof ing === 'string') {
        return nameMatches(ing, recipeName);
      } else if (Array.isArray(ing)) {
        return ing.some(i => nameMatches(i, recipeName));
      }
      return false;
    });
  });
};

// Helper pour obtenir l'image d'un ingrédient ou d'une recette
export const getItemImage = (name, recipes) => {
  const ingredient = findIngredientByName(name);
  if (ingredient) return ingredient.image;
  
  const recipe = findRecipeByName(name, recipes);
  return recipe?.image;
};
