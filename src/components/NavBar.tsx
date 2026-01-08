import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContextComponent";


export default function NavBar() {
  const navigate = useNavigate()
  const { searchValue, setSearchValue}: any = useContext(GlobalContext)

  function handleSearch(){
  
    console.log(searchValue)
    navigate('/')
  }
  return (
    <nav className="flex justify-between  w-9/10 mx-auto p-5 font-sans items-center text-gray-700">
      <NavLink to="/" className="font-serif font-bold text-xl">
        Food Recipe
      </NavLink>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch()
        }
      }
      >
        <input
          type="text"
          placeholder="E.g., mango"
          onChange={(e) => setSearchValue(e.target.value)}
          className="rounded-3xl shadow-sm shadow-red-300 p-2 px-5 text-sm focus:shadow-red-600 focus:outline-0"
        />
      </form>
      <ul className="flex gap-2.5 font-sans text-md">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "text-red-500" : "")}
        >
          Favorites
        </NavLink>
      </ul>
    </nav>
  );
}


// https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}
// https://forkify-api.herokuapp.com/api/v2/recipes/${id}