'use client';
import React, { useContext, useEffect, useState } from 'react'
import { FavoriteContext } from '@/app/page'
import { Character, Episode, EpisodesResponse } from '@/types/episodeTypes'
import { Star } from 'lucide-react';

export default function ListEpisodes() {

    const [isLoading, setIsLoading] = useState(true);
    const { favorites, setFavorites, episodes, setEpisodesValue, globalEpisodes, setGlobalEpisodes, addFavorite, removeFavorite } = useContext(FavoriteContext);

    const fetchEpisodes = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const data: EpisodesResponse = await response.json();

            for (let episode of data.results) {
                const characterPromises = episode.characters.map((charUrl) => fetchCharacter(charUrl));
                episode.charactersData = await Promise.all(characterPromises);
            }

            setGlobalEpisodes(data.results);
            setEpisodesValue(data.results);

            const localFavs = localStorage.getItem('favorites');
            let favIds: number[] = localFavs ? JSON.parse(localFavs) as number[] : [];
            setFavorites(favIds);
            setGlobalEpisodes(data.results.filter(episode => !favIds.includes(episode.id)));


        } catch (error) {
            console.error('Error fetching episodes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCharacter = async (url: string): Promise<Character> => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dataResponse : Character = {
                id: data.id,
                name: data.name,
                image: data.image
            };
            return dataResponse;
        } catch (error) {
            console.error('Error fetching character:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchEpisodes();
    }, []);

    useEffect(() => {
    }, [globalEpisodes]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className='text-center font-bold mb-4'>All Episodes</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {globalEpisodes.map((episode) => (
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

