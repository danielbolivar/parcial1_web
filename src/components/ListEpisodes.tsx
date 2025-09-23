'use client';
import React, { useEffect, useState } from 'react'

interface Character {
    id: number;
    name: string;
    image: string;
}

interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    charactersData?: Character[];
    url: string;
    created: string;
}

interface EpisodesResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Episode[];
}


export default function ListEpisodes() {

    const [isLoading, setIsLoading] = useState(true);
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    const fetchEpisodes = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const data: EpisodesResponse = await response.json();

            for (let episode of data.results) {
                const characterPromises = episode.characters.map((charUrl) => fetchCharacter(charUrl));
                episode.charactersData = await Promise.all(characterPromises);
            }

            setEpisodes(data.results);
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

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {episodes.map((episode) => (
                        <li key={episode.id} className="mb-6 border-2 border-solid border-black  p-4">
                            <div className='mb-4 flex justify-between'>
                                <h3 className='text-lg font-bold'>{episode.name} <label className='text-sm text-gray-500'>{episode.episode}</label> </h3>
                                <p className='text-sm font-semibold'>Air Date: {episode.air_date}</p>
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

