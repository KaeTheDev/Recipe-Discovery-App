import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useFetch from "../../custom-hooks/useFetch";
import type { SearchRecipe } from "../../types";

export const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch<{ meals: SearchRecipe[] | null }>(
    searchTerm
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      setIsDropdownOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black px-4 py-5">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="text-3xl text-white font-bold">
          Recipe Discovery App
        </Link>

        <div className="relative w-full max-w-md" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search Recipes..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full border px-4 py-2 rounded text-white"
          />

          {isDropdownOpen && searchTerm && (
            <div className="absolute w-full bg-white shadow rounded mt-1 max-h-64 overflow-y-auto z-10">
              {loading && <p className="p-2 text-sm">Searching...</p>}
              {error && <p className="p-2 text-sm text-red-500">{error}</p>}

              {data?.meals?.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/recipe/${meal.idMeal}`}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {meal.strMeal}
                </Link>
              ))}

              {data?.meals === null && (
                <p className="p-2 text-sm">No results found</p>
              )}
            </div>
          )}
        </div>

        <ul className="flex gap-4 text-white">
          <li>
            <Link className="hover:text-orange-300" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-300" to="/favorites">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};