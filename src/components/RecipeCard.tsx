import { NavLink } from "react-router-dom";

export type recipeCardProps = {
  id: string;
  publisher: string;
  image_url: string;
  title: string;
};

export default function RecipeCard({
  recipeData,
}: {
  recipeData: recipeCardProps;
}) {
  return (
    <div className="max-w-80 h-fit rounded-3xl shadow-md shadow-gray-900 p-5 flex flex-col gap-3 ">
      <img
        src={recipeData.image_url}
        alt={recipeData.title}
        className="w-full block aspect-2/1 object-cover rounded-t-xl"
      />
      <span className="text-cyan-800 text-sm ">{recipeData.publisher}</span>
      <h3 className="text-md truncate font-bold">{recipeData.title}</h3>
      <NavLink
        to={`/recipe-details/${recipeData.id}`}
        className="bg-gray-900 rounded-lg p-2 px-3 block w-fit text-white text-md"
      >
        Recipe Details
      </NavLink>
    </div>
  );
}
