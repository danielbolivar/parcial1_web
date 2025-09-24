export interface Character {
    id: number;
    name: string;
    image: string;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    charactersData?: Character[];
    url: string;
    created: string;
}

export interface EpisodesResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Episode[];
}

export interface FavoriteContextType {
    favorites: number[];
    setFavorites: (favorites: number[]) => void;
    episodes: Episode[];
    setEpisodesValue: (episodes: Episode[]) => void;
    globalEpisodes: Episode[];
    setGlobalEpisodes: (episodes: Episode[]) => void;
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}
