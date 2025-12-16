import { Link } from "react-router-dom"

export const Navbar: React.FC = () => {
    return (
        <nav className="bg-black px-4 py-5">
            <div className="flex flex-row justify-between">
            <p className="text-3xl text-white">Recipe Discovery App</p>
            <input className="border text-white px-4 py-4" type="text" placeholder="Search Recipe..." />
            <ul className="flex flex-row">
                <li className="text-white hover:text-orange-300"> <Link className="mr-3" to={"/"}>Home</Link></li>
                <li className="text-white hover:text-orange-300"><Link to={"/favorites"}>Favorites</Link></li>
            </ul>
            </div>
        </nav>
    )
}