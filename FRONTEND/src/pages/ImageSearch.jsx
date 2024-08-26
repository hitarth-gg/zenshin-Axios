import React, { useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import { Button } from "@radix-ui/themes";
import folderClosed from '../assets/pngaaa.com-1755988.png';
import folderOpen from '../assets/pngaaa.com-1756006.png';

const ReverseImageSearch = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSearch = async () => {
        if (!selectedFile) {
            alert('Please select an image file first.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await fetch('https://api.trace.moe/search', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            setSearchResults(data.result);
            console.log(data.result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-8">
      <h1 className="text-2xl font-bold flex justify-center mb-10 font-space-mono">Reverse Image Search</h1>
      <h5 className="text-lg flex justify-center mb-2 font-space-mono">Drag image below!</h5>
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row justify-evenly border-2 border-gray-400 mx-8 rounded-lg p-6">
          <div className="flex items-center justify-evenly w-full gap-x-4">
            <label className="relative cursor-pointer flex items-center justify-center">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {/* Display appropriate icon and file name */}
              <div
                className={`w-10 h-10 bg-center bg-contain bg-no-repeat transition-opacity duration-300 ${selectedFile ? 'opacity-100' : 'opacity-100'}`}
                style={{
                  backgroundImage: `url(${selectedFile ? folderOpen : folderClosed})`,
                }}
              ></div>
              <p className={`ml-4 ${selectedFile ? 'text-white' : 'hidden'}`}>
                {selectedFile?.name}
              </p>
            </label>

            <Button
              onClick={handleSearch}
              disabled={!selectedFile || loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults &&
          searchResults.map((result, index) => (
            <SearchResultCard key={index} result={result} />
          ))}
      </div>
    </div>
  );
};

export default ReverseImageSearch;