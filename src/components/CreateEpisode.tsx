import React, { useContext } from 'react'
import { Character, Episode } from '@/types/episodeTypes'
import { useForm } from 'react-hook-form'
import { FavoriteContext } from '@/app/page';

interface CreateEpisodeForm {
    name: string;
    characters: string[];
}

export default function CreateEpisode() {
    const fetchCharacter = async (id: string): Promise<Character> => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                const dataResponse = {
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

  const { register, handleSubmit, reset, formState } = useForm<Episode>();
  const { episodes, setGlobalEpisodes, setEpisodesValue } = useContext(FavoriteContext);

  const onSubmit = async (data: Episode) => {

    data.characters = data.characters.toString().split('-').map(id => id.trim());
    const charactersData = await Promise.all(data.characters.map(id => fetchCharacter(id)));


    console.log(charactersData);
    const newEpisode = {
      ...data,
      id: episodes.length ? Math.max(...episodes.map(ep => ep.id)) + 1 : 1,
      characters: [],
      charactersData: charactersData,
      url: '',
      air_date: new Date().toISOString().split('T')[0],
      episode: 'AWO01',
      created: new Date().toISOString(),
    };
    const updatedEpisodes = [...episodes, newEpisode];
    setEpisodesValue(updatedEpisodes);
    setGlobalEpisodes(updatedEpisodes);

    reset();
  };

  return (
    <div className='p-4 border-2 border-solid border-black m-4'>
        <h2 className='text-center font-bold mb-4'>Create New Episode</h2>
        <hr className="border-t border-black my-4 -mx-4 w-[calc(100%+2rem)]" />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <input
          {...register("name", {
            required: "El nombre es obligatorio",
            minLength: { value: 6, message: "El nombre debe tener al menos 6 caracteres" }
          })}
          placeholder="Episode Name"
        />
        <input {...register("characters",{
            required: true,
            pattern: { value: /^(\d+-)*\d+$/ , message: "Los characters deben ser IDs separados por guiones por ejemplo: 1-2-5-23" }
        })} placeholder="Characters" />
        <button type="submit" className='bg-black text-white hover:shadow-2xl rounded-md disabled:bg-gray-400' disabled={!formState.isValid} >Create Episode</button>
      </form>
    </div>
  )
}

