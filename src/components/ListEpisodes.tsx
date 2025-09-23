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
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {episodes.map((episode) => (
                        <li key={episode.id}>
                            <h3>{episode.name}</h3>
                            <p>Air Date: {episode.air_date}</p>
                            <p>Episode: {episode.episode}</p>
                            <p>Characters: </p>
                            <ul>
                                {episode.charactersData?.map((character) => (
                                    <li key={`char_${character.id}`}>
                                        <img src={character.image} alt="Character Image" width={50} height={50} />
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

