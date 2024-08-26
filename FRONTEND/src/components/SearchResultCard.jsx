import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
// import './styles.css'; // Add your custom styles here

const SearchResultCard = ({ result }) => {
  return (
    <div className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-sm m-4 transition-all ease-in-out hover:scale-110">
      <div className="p-4 bg-gray-800">
        <h2 className="text-lg font-bold text-white-800 h-20">{`Anime: ${result.filename}`}</h2>
      </div>
      <div className="p-4">
        <p className="text-white-600">{`Episode: ${result.episode || 'N/A'}`}</p>
        <p className="text-white-600">{`Similarity: ${result.similarity.toFixed(2)}`}</p>
        <p className="text-white-600">{`Timestamp: ${result.from} - ${result.to} seconds`}</p>

        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <img
              className="rounded mt-4 cursor-pointer w-80 h-56"
              src={result.image}
              alt="Preview"
              referrerPolicy="no-referrer"
            />
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="HoverCardContent bg-gray-800 p-4 rounded shadow-lg"
              sideOffset={5}
            >
              <div className="flex flex-col gap-3">
                <img
                  className="rounded w-full"
                  src={result.image}
                  alt="Detailed Preview"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold">{`Anime: ${result.filename}`}</p>
                  <p className="text-sm text-white-600">{`Episode: ${result.episode || 'N/A'}`}</p>
                  <p className="text-sm text-white-600">{`Similarity: ${result.similarity.toFixed(2)}`}</p>
                  <p className="text-sm text-white-600">{`Timestamp: ${result.from} - ${result.to} seconds`}</p>
                </div>
              </div>
              <HoverCard.Arrow className="HoverCardArrow" />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
      <div className="p-4 bg-gray-800 ">
        <a
          href={result.video}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute bottom-0 "
        >
          Watch Preview
        </a>
      </div>
    </div>
  );
};

export default SearchResultCard;