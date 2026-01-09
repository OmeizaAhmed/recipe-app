import { useContext } from "react";
import { GlobalContext } from "../GlobalContextComponent";
import type { recipeCardProps } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";

export default function Favorite() {
  const { favorites }: any = useContext(GlobalContext);
  console.log(favorites);

  return favorites.length ? (
    <div className="w-9/10 mx-auto grid lg:grid-cols-4 lg:w-8/10 gap-5">
      {favorites.map((recipe: recipeCardProps, index: number) => (
        <RecipeCard recipeData={recipe} key={index} />
      ))}
    </div>
  ) : (
    <h1 className="text-center text-3xl font-bold">
      Your Favorite List is Empty
    </h1>
  );
}
