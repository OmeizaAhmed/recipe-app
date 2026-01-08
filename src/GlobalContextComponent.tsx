import { createContext, useState } from "react";


export const GlobalContext = createContext<{searchValue: string, setSearchValue: (value:string) => void} | null>(null)

export default function GlobalContextComponent({children}: {children: React.ReactElement}){
  const [searchValue, setSearchValue] = useState('')
   return(
    <GlobalContext.Provider value={{searchValue, setSearchValue}}>
      {children}
    </GlobalContext.Provider>
   )
}