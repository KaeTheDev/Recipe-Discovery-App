import { useParams } from "react-router-dom";
import type { Recipe } from "../types";
import useFetch from "../custom-hooks/useFetch";

export const RecipeDetail: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const { data, loading, error } = useFetch<{ meals: Recipe[] | null }>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`
  );

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center mt-6">{error}</p>;

  const meal = data?.meals?.[0];

  if (!meal)
    return (
      <p className="text-center mt-6">
        No recipe details found for {recipeID}.
      </p>
    );

  // Build the ingredients array
  const ingredients: string[] = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}` as keyof Recipe] as
      | string
      | null;
    const measure = meal[`strMeasure${i + 1}` as keyof Recipe] as string | null;
    if (ingredient && ingredient.trim() !== "") {
      return `${measure ?? ""} ${ingredient}`;
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
        {/* Add to Favorites Button */}
        <button className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded transition-transform hover:scale-105">
          Add to Favorites
        </button>
        <h1 className="text-3xl font-bold">{meal.strMeal}</h1>
        <p>
          <span className="font-semibold">Recipe ID:</span> {meal.idMeal}
        </p>
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
            {ingredients.map((item: string, idx: number) => (
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
