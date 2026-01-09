import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorite"
import Details from "./pages/Details"

function App() {

  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/favorites" element={<Favorites />}/>
      <Route path="/recipe-details/:id" element={<Details />}/>
    </Routes>
    </>
  )
}

export default App
