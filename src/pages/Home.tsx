import { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { GlobalContext } from "../GlobalContextComponent";
import type { recipeCardProps } from "../components/RecipeCard";
import { Circles } from "react-loader-spinner";

export default function NavBar() {
  const { loading, error, recipeList }: any = useContext(GlobalContext);

  if (loading)
    return (
      <span className="w-fit mx-auto block">
        <Circles
          height="80"
          width="80"
          color="pink"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ margin: "20px" }}
          visible={true}
        />
      </span>
    );
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
