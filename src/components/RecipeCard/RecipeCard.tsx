import { Link } from "react-router-dom";
import type { RecipeCardProps } from "../../types";

export const RecipeCard: React.FC<RecipeCardProps> = ({
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strArea
}) => {
return (
    <Link to={`/recipe/${idMeal}`}>
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img src={strMealThumb} alt={strMeal} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h2 className="text-lg font-semibold">{strMeal}</h2>
            {strCategory && <p className="text-sm text-gray-600">{strCategory}</p>}
            {strArea && <p className="text-sm text-gray-600">{strArea}</p>}
        </div>
    </div>
</Link>
)
}