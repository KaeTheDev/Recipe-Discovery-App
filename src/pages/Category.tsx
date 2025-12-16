import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import type { CategoryRecipe } from "../types";
import useFetch from "../custom-hooks/useFetch";

export const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string}>();
  const { data, loading, error } = useFetch<{ meals: CategoryRecipe[] }>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data || !data.meals) return <p>No recipes found for {categoryName}.</p>;


  return (
    <>
      <h1 className="text-3xl text-center mb-6">{categoryName} Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-4">
        {data?.meals.map((meal) => (
          <Link
            key={meal.idMeal}
            to={`/recipe/${meal.strMeal}`}
            className="block p-4 text-center border rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
          </Link>
        ))
        }
      </div>
    </>
  );
};