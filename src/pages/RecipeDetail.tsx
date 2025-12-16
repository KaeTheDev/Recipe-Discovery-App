import { useParams } from "react-router-dom";
import { useContext } from "react";
import type { Recipe } from "../types";
import useFetch from "../custom-hooks/useFetch";
import FavoritesContext from "../context/FavoritesContext";
import Spinner from "../components/Spinner/Spinner";


export const RecipeDetail: React.FC = () => {
  // ✅ 1. Get Favorites Context FIRST and guard it
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error("RecipeDetail must be used within a FavoritesProvider");
  }

  const { addFavorite, removeFavorite, isFavorite } = favoritesContext;

  // ✅ 2. Get route param
  const { recipeID } = useParams<{ recipeID: string }>();

  // ✅ 3. Fetch recipe details by ID
  const { data, loading, error } = useFetch<{ meals: Recipe[] | null }>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`
  );

  if (loading) return <Spinner message="Fetching recipe details..." />;
  if (error) return <p className="text-center mt-6">{error}</p>;

  // ✅ 4. Extract meal safely
  const meal = data?.meals?.[0];

  if (!meal) {
    return (
      <p className="text-center mt-6">No recipe details found for {recipeID}</p>
    );
  }

  // ✅ 5. Check favorite status AFTER meal exists
  const isFavorited = isFavorite(meal.idMeal);

  // ✅ 6. Toggle favorite
  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  // ✅ 7. Build ingredients list
  const ingredients: string[] = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof Recipe] as
      | string
      | null;
    const measure = meal[`strMeasure${i + 1}` as keyof Recipe] as string | null;

    if (ingredient && ingredient.trim()) {
      return `${measure ?? ""} ${ingredient}`.trim();
    }

    return null;
  }).filter(Boolean) as string[];

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      {/* Recipe Image */}
      <img
        className="w-full rounded-lg shadow-lg"
        src={meal.strMealThumb}
        alt={meal.strMeal}
      />

      {/* Recipe Details */}
      <div className="space-y-4">
        {/* ✅ Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`px-4 py-2 rounded text-white transition font-semibold
            ${
              isFavorited
                ? "bg-red-600 hover:bg-red-500"
                : "bg-green-700 hover:bg-green-500"
            }`}
        >
          {isFavorited ? "Favorited ❤️" : "Add to Favorites"}
        </button>

        <h1 className="text-3xl font-bold">{meal.strMeal}</h1>

        <p>
          <span className="font-semibold">Category:</span> {meal.strCategory}
        </p>

        <p>
          <span className="font-semibold">Area:</span> {meal.strArea}
        </p>

        {/* Ingredients */}
        <div>
          <span className="font-semibold text-lg">Ingredients:</span>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <span className="font-semibold text-lg">Instructions:</span>
          <p className="mt-1 whitespace-pre-wrap">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};