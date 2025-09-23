'use client';
import ListEpisodes from "@/components/ListEpisodes";
import { useContext, useState, createContext } from "react";



const FavoriteContext = createContext<any>(null);

export default function Home() {

  const [favorites, setFavorites] = useState<number[]>([]);

  const addFavorite = (id: number) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  return (
    <FavoriteContext value={{ favorites, addFavorite, removeFavorite }}>
      <div className="container mx-auto p-4">
        <ListEpisodes />
      </div>
    </FavoriteContext>
  );
}
