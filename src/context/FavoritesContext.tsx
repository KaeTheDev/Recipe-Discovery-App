// 3. Global State with Context API
// Create a FavoritesContext to manage the user’s list of favorite recipes globally.
// The context must provide:
// A list of favorite recipe IDs.
// A function to add a recipe to favorites.
// A function to remove a recipe from favorites.
// A function to check if a recipe is already in favorites.
// This context should use your useLocalStorage hook internally to persist the favorites list across browser sessions.

import React from "react";
import type { FavoritesContextType } from "../types";
import useLocalStorage from "../custom-hooks/useLocalStorage";

const FavoritesContext = React.createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "favoriteRecipes",
    []
  );

  const addFavorite = (id: string) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
export default FavoritesContext;