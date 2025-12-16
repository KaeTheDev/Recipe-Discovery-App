import { useLocation } from "react-router-dom";
import useFetch from "../custom-hooks/useFetch";
import type { SearchRecipe } from "../types";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
import Spinner from "../components/Spinner/Spinner";

export const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") ?? "";

    const { data, loading, error } = useFetch<{ meals: SearchRecipe[] | null}> (
        query ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}` : ""
    );

    if(loading) return <Spinner message="Searching for Results..." />;
    if(error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="px-4">
            <h1 className="text-3xl mb-6">
                Search Results for "{query}"
            </h1>

            {data?.meals === null && <p>No recipes found.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.meals?.map((meal) => (
                    <RecipeCard
                    key={meal.idMeal}
                    idMeal={meal.idMeal}
                    strMeal={meal.strMeal}
                    strMealThumb={meal.strMealThumb}
                    strCategory={meal.strCategory}
                    strArea={meal.strArea}
                    />
                ))}
            </div>
        </div>
    )
}