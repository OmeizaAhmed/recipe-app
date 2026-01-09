import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { GlobalContext } from "../GlobalContextComponent";
import type { recipeCardProps } from "../components/RecipeCard";

export default function NavBar() {
  const { loading, error, recipeList }: any = useContext(GlobalContext);

  if (loading) return <h1 className="text-center">Loading... Please Wait</h1>;
  if (error) return <h1 className="text-center">{error}</h1>;
  return recipeList && recipeList.length ? (
    <div className="w-9/10 mx-auto grid lg:grid-cols-4 lg:w-8/10 gap-5">
      {recipeList.map((recipe: recipeCardProps, index: number) => (
        <RecipeCard recipeData={recipe} key={index} />
      ))}
    </div>
  ) : (
    <h1 className="text-center text-3xl font-bold">Search for Recipe</h1>
  );
}
