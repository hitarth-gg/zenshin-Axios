import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
// import './styles.css'; // Add your custom styles here

const SearchResultCard = ({ result }) => {
  return (
    <div className="relative font-space-mono border border-gray-600 shadow-lg  overflow-hidden max-w-sm m-4 transition-all ease-in-out hover:scale-110">
      <div className="p-4 ">
        <h2 className="text-lg font-bold text-white-800 h-20">{`Anime: ${result.filename}`}</h2>
      </div>
      <div className="p-4">
        <p className="text-white-600">{`Episode: ${result.episode || 'N/A'}`}</p>
        <p className="text-white-600">{`Similarity: ${result.similarity.toFixed(2)}`}</p>
        <p className="text-white-600">{`Timestamp: ${result.from} - ${result.to} seconds`}</p>

        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <img
              className="duration-400 z-10 h-60 aspect-video animate-fade rounded-sm object-cover transition-all ease-in-out"
              src={result.image}
              alt="Preview"
              referrerPolicy="no-referrer"
            />
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              className="HoverCardContent  p-4 rounded shadow-lg"
              sideOffset={5}
            >
              <div className="flex flex-col gap-3">
                <img
                  className=""
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
      <div className="p-4 ">
        <a
          href={result.video}
          target="_blank"
          rel="noopener noreferrer"
          className="duration-400 z-10 h-60 w-40 animate-fade rounded-md object-cover transition-all ease-in-out"
        >
          Watch Preview
        </a>
      </div>
    </div>
  );
};

export default SearchResultCard;