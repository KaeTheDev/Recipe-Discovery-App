import { Link } from "react-router-dom";
import type { RecipeCategories } from "../types";
import useFetch from "../custom-hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";

export const Home: React.FC = () => {
    const { data, loading, error } = useFetch<{ categories: RecipeCategories[] }>(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );

      if (loading) return <Spinner message="Loading..." />;
if(error) return <p>{error}</p>

return(
    <>
    <h1 className="text-3xl text-center mb-6">Recipe Categories</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-4">
            {data?.categories.map((category) => (
                <Link
                key={category.idCategory}
                to={`/category/${category.strCategory}`}
                className="block p-4 text-center border rounded-lg hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                <img src={category.strCategoryThumb} alt={category.strCategory} 
                className="w-full h-auto rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{category.strCategory}</h2>
                </Link>
            ))}
        </div>
    </>
)
}