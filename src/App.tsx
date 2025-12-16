import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/recipe/:recipeID" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;