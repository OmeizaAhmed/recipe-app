import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { PiBowlSteam } from "react-icons/pi";
import { GlobalContext } from "../GlobalContextComponent";
import type { recipeCardProps } from "../components/RecipeCard";
import { Circles } from "react-loader-spinner";
type ingredientsType = {
  quantity: number;
  unit: string;
  description: string;
};

type recipeDetailType = {
  ingredients: ingredientsType[];
  publisher: string;
  image_url: string;
  title: string;
  cooking_time: number;
  servings: number;
  id: string;
};

export default function Details() {
  let { id } = useParams();
  id = id || "";
  const [recipeDetails, setRecipeDetails] = useState<recipeDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites, setFavorites }: any = useContext(GlobalContext);
  const [isfavorite, setIsFavorite] = useState(false);

  function handleFavoriteList(id: string) {
    const cpyFavorite = favorites;
    const favoriteIndex = cpyFavorite.findIndex(
      (item: recipeCardProps) => item.id === id
    );
    if (favoriteIndex !== -1) {
      cpyFavorite.splice(favoriteIndex, 1);
    } else {
      cpyFavorite.push({
        id: recipeDetails?.id,
        publisher: recipeDetails?.publisher,
        image_url: recipeDetails?.image_url,
        title: recipeDetails?.title,
      });
    }
    setFavorites(cpyFavorite);
    setIsFavorite((prev) => !prev);
  }

  function checkIsFavorite() {
    const favoriteIndex = favorites.findIndex(
      (item: recipeCardProps) => item.id === id
    );
    if (favoriteIndex === -1) {
      setIsFavorite(false);
    } else setIsFavorite(true);
  }

  async function fetchRecipeDetails() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching data status code: ${res.status}`);
      }
      const { data } = await res.json();

      setRecipeDetails({
        ingredients: data.recipe.ingredients,
        publisher: data.recipe.publisher,
        image_url: data.recipe.image_url,
        title: data.recipe.title,
        cooking_time: data.recipe.cooking_time,
        servings: data.recipe.servings,
        id: data.recipe.id,
      });
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  useEffect(() => {
    fetchRecipeDetails();
    checkIsFavorite();
  }, [id]);
  if (error) return <h1 className="text-center">{error}</h1>;
  if (loading)
    return <span className="w-fit mx-auto block"><Circles
  height="80"
  width="80"
  color="pink"
  ariaLabel="three-dots-loading"
  wrapperStyle={{ margin: '20px' }}
  visible={true}
/></span>;
  return recipeDetails ? (
    <div className="w-9/10 lg:w-4/5 mx-auto flex gap-6">
      <img
        src={recipeDetails.image_url}
        alt={recipeDetails.title}
        className="w-130 rounded-3xl h-80 object-cover sticky"
      />
      <div className="h-100 overflow-y-auto p-5 px-7 grow">
        <span className="text-sm text-cyan-800">{recipeDetails.publisher}</span>
        <h3 className="font-bold text-xl my-2">{recipeDetails.title}</h3>
        <button
          className="px-3 py-1.5 rounded-lg bg-gray-900 text-white cursor-pointer"
          onClick={() => handleFavoriteList(id)}
        >
          {isfavorite ? "Remove from" : "Save to"} Favorites
        </button>
        <p className="my-2 text-md">
          <PiBowlSteam className="inline mr-1.5" />
          {recipeDetails.servings} serving
          {recipeDetails.servings > 1 ? "s" : ""}{" "}
          <MdAccessTime className="inline mx-1.5" />
          {recipeDetails.cooking_time} minutes
        </p>
        <h3 className="font-bold text-xl">Ingredients: </h3>
        <ol className="flex flex-col gap-2.5 ml-6 ">
          {recipeDetails.ingredients.map(
            (ingredient: ingredientsType, index: number) => (
              <li className="list-decimal pl-2" key={index}>
                {ingredient.quantity}
                <span className="mx-0.5">{ingredient.unit}</span>
                {ingredient.description}
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  ) : null;
}
