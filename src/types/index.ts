type Ingredients = {
    [key in `strIngredient${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string | null;
  };
  
  type Measures = {
    [key in `strMeasure${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`]: string | null;
  };
  
  export interface Recipe extends Ingredients, Measures {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
  }  

  export interface RecipeCardProps {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string; 
  }

  export interface RecipeCategories {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }

  export interface CategoryRecipe {
    strMeal: string;
    strMealThumb: string;
    idMeal: string;
  }

  export interface SearchRecipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
  }

  export interface FetchProps<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
  }

  export interface FavoritesContextType {
    favorites: string[]; // array of recipe IDs
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
  }