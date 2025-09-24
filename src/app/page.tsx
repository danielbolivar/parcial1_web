'use client';
import ListEpisodes from "@/components/ListEpisodes";
import { useContext, useState, createContext } from "react";
import { Episode, FavoriteContextType } from "@/types/episodeTypes";
import ListFavorites from "@/components/ListFavorites";

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  globalEpisodes: [],
  setGlobalEpisodes: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

export default function Home() {

  const [favorites, setFavorites] = useState<number[]>([]);
  const [globalEpisodes, setGlobalEpisodes] = useState<Episode[]>([]);

  const addFavorite = (id: number) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const setEpisodesGlobal = (episodes: Episode[]) => {
    setEpisodesGlobal(episodes);
  }

  return (
    <FavoriteContext.Provider value={{ favorites, globalEpisodes, setGlobalEpisodes, addFavorite, removeFavorite }}>
      <div className="flex mx-auto p-4">
        <ListEpisodes />
        <div className="flex flex-col">
          <ListFavorites/>
        </div>
      </div>
    </FavoriteContext.Provider>
  );
}
