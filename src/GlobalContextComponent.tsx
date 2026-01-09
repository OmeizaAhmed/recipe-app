import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

type GlobalContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  recipeList: unknown;
  setRecipeList: (value: unknown) => void;
  handleSearch: () => void;
  favorites: unknown;
  setFavorites: (id: string) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export default function GlobalContextComponent({
  children,
}: {
  children: React.ReactElement;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipeList, setRecipeList] = useState<null | unknown>();
  const [favorites, setFavorites] = useState<unknown>([]);
  const navigate = useNavigate();

  async function handleSearch() {
    navigate("/");
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching Data: ${res.status}`);
      }
      const data = await res.json();
      setRecipeList(data.data.recipes);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        searchValue,
        setSearchValue,
        loading,
        setLoading,
        error,
        setError,
        recipeList,
        setRecipeList,
        handleSearch,
        setFavorites,
        favorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
