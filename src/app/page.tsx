'use client';
import ListEpisodes from "@/components/ListEpisodes";
import { useContext, useState, createContext, useEffect } from "react";
import { Episode, FavoriteContextType } from "@/types/episodeTypes";
import ListFavorites from "@/components/ListFavorites";
import { toast } from "sonner";
import { set } from "zod";

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  setFavorites: () => {},
  episodes: [],
  setEpisodesValue: () => {},
  globalEpisodes: [],
  setGlobalEpisodes: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

export default function Home() {

  const [favorites, setFavorites] = useState<number[]>([]);
  const [globalEpisodes, setGlobalEpisodes] = useState<Episode[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const addFavorite = (id: number) => {

    setFavorites((prev) => [...prev, id]);
    setGlobalEpisodes(globalEpisodes
      .filter(episode => episode.id !== id));
    localStorage.setItem('favorites', JSON.stringify([...favorites, id]));
    console.log(localStorage.getItem('favorites'));
    toast('Added to favorites');
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setGlobalEpisodes((prev) => [...prev, episodes.find(episode => episode.id === id)!].sort((a, b) => a.id - b.id));
    localStorage.setItem('favorites', JSON.stringify(favorites.filter((favId) => favId !== id)));
    console.log(localStorage.getItem('favorites'));
    toast('Removed from favorites');
  };

  const setEpisodesValue = (episodes: Episode[]) => {
    setEpisodes(episodes);
  }

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites,episodes,setEpisodesValue ,globalEpisodes, setGlobalEpisodes, addFavorite, removeFavorite }}>
      <div className="flex mx-auto p-4">
        <ListEpisodes />
        <div className="flex flex-col">
          <ListFavorites/>
        </div>
      </div>
    </FavoriteContext.Provider>
  );
}
