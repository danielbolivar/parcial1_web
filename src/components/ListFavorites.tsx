import { FavoriteContext } from '@/app/page'
import { Episode } from '@/types/episodeTypes'
import { Star } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'

export default function ListFavorites() {
    const { favorites, globalEpisodes, setGlobalEpisodes, addFavorite, removeFavorite } = useContext(FavoriteContext)
    const [favoritesData, setFavoritesData] = useState<Episode[]>([]);

    useEffect(()=>{
        console.log(favorites);
        setFavoritesData(globalEpisodes.filter(episode => favorites.includes(episode.id)))
        console.log(favoritesData)
        console.log(globalEpisodes)
    }, [favorites])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {favoritesData.length === 0 ? (
                <p className="text-gray-500 text-center">No tienes episodios favoritos aún.</p>
            ) : (
                <ul>
                    {favoritesData.map((episode) => (
                        <li key={episode.id} className="mb-6 border-2 border-solid border-black  p-4">
                            <div className='mb-4 flex justify-between items-start '>
                                <div>
                                    <h3 className='text-lg font-bold'>{episode.name} <label className='text-sm text-gray-500'>{episode.episode}</label> </h3>
                                    <p className='text-sm font-semibold'>Air Date: {episode.air_date}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        favorites.includes(episode.id)
                                            ? removeFavorite(episode.id)
                                            : addFavorite(episode.id)
                                    }
                                >
                                    <Star fill={favorites.includes(episode.id) ? 'gold' : 'none'} color={favorites.includes(episode.id) ? 'gold' : 'black'} />
                                </button>
                            </div>
                            <hr className="border-t border-black my-4 -mx-4 w-[calc(100%+2rem)]" />
                            <p className='text-sm font-semibold '>Characters: </p>
                            <ul className="flex flex-wrap gap-7">
                                {episode.charactersData?.slice(0, 5).map((character) => (
                                    <li key={`char_${character.id}`} className="flex flex-col items-center">
                                        <img className='rounded-full' src={character.image} alt="Character Image" width={50} height={50} />
                                        <p className='text-sm font-semibold'>{character.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
