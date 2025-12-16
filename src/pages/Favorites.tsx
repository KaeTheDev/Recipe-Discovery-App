import { useContext, useEffect, useState } from "react";
import FavoritesContext from "../context/FavoritesContext";
import type { Recipe } from "../types";

export const Favorites: React.FC = () => {
    const favoritesContext = useContext(FavoritesContext);

    if(!favoritesContext) {
        throw new Error("Favorites must be used within a FavoritesProvider");
    }

    const { favorites } = favoritesContext;

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFavorites = async () => {
          if (favorites.length === 0) {
            setRecipes([]);
            setLoading(false);
            return;
          }
    
          setLoading(true);
    
          try {
            const requests = favorites.map((id) =>
              fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
              ).then((res) => res.json())
            );
    
            const results = await Promise.all(requests);
    
            const meals = results
              .map((result) => result.meals?.[0])
              .filter(Boolean);
    
            setRecipes(meals);
          } catch (error) {
            console.error("Failed to fetch favorite recipes", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFavorites();
      }, [favorites]);
    
      if (loading) {
        return <p className="text-center mt-6">Loading favorites...</p>;
      }

      return (
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>
    
          {recipes.length === 0 ? (
            <p>You haven't added any favorite recipes yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recipes.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="border rounded-lg shadow hover:shadow-lg transition p-4"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="rounded mb-2"
                  />
                  <h2 className="font-semibold text-lg">{meal.strMeal}</h2>
                  <p className="text-sm text-gray-600">
                    {meal.strCategory} • {meal.strArea}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };