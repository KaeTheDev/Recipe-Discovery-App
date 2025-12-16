import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

export const Favorites: React.FC = () => {
    const favoritesContext = useContext(FavoritesContext);

    if(!favoritesContext) {
        throw new Error("Favorites must be used within a FavoritesProvider");
    }

    const { favorites } = favoritesContext;

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Favorite Recipes</h1>

            {favorites.length === 0 ? (
                <p>You haven't added any favorite recipes yet.</p>
            ) : (
                <ul>
                    {favorites.map((id) => (
                        <li key={id}>{id}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};