import React, { useEffect, useState } from 'react';
import useGetAnimeById from '../hooks/useGetAnimeById';
import AnimeCard from '../components/AnimeCard';

// Component to fetch and append individual anime data to the list
const FavoriteAnimeItem = ({ animeId, setFavanime, setLoading, setError }) => {
    const { isLoading, animeData, error, status } = useGetAnimeById(animeId);

    useEffect(() => {
        setLoading(isLoading);
        if (status === 'success' && animeData) {
            setFavanime(prevFavanime => [...prevFavanime, animeData]);

            // Store fetched anime data in local storage cache
            const cache = JSON.parse(localStorage.getItem('animeCache')) || {};
            cache[animeId] = animeData;
            localStorage.setItem('animeCache', JSON.stringify(cache));
        }
        if (error) {
            setError(true);
        }
    }, [status, animeData, isLoading, error, setFavanime, setLoading, setError, animeId]);

    return null;
};

// Main component to handle favorite animes
const FavoriteAnimes = () => {
    const [favoriteAnimeIds, setFavoriteAnimeIds] = useState([]);
    const [favanime, setFavanime] = useState([]); // Initialize favanime as an empty list
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoritesList')) || [];
        setFavoriteAnimeIds(storedFavorites);
        setLoading(false);

        const cache = JSON.parse(localStorage.getItem('animeCache')) || {};

        // Initialize favanime with cached data
        const cachedAnime = storedFavorites
            .filter(id => cache[id])
            .map(id => cache[id]);
        setFavanime(cachedAnime);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
      <div className="mx-5 mt-8">
        {favoriteAnimeIds.map(animeId => {
            const cache = JSON.parse(localStorage.getItem('animeCache')) || {};
            if (cache[animeId]) {
                //dont do anything
            } else {
                // Fetch data if not in cache
                return (
                    <FavoriteAnimeItem 
                        key={animeId} 
                        animeId={animeId} 
                        setFavanime={setFavanime} 
                        setLoading={setLoading}
                        setError={setError}
                    />
                );
            }
        })}
        <div className="mb-2 ml-8 tracking-wider text-lg border-b border-gray-700 pb-1 font-space-mono font-bold">
          Favorite Anime
        </div>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {!isLoading &&
            !error &&
            favanime?.map((anime) => (
              <AnimeCard key={anime.id} data={anime} />
            ))}
        </div>
        {isLoading && <p>Loading favorite animes...</p>}
        {error && <p>Error loading favorite animes. Please try again later.</p>}
      </div>
    );
};

export default FavoriteAnimes;