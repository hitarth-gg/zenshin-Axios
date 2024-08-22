import { format } from "date-fns";
import useNyaaTracker from "../hooks/useNyaaTracker";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Episode({
  data,
  anime,
  animeId,
  englishDub,
  episodeNumber,
  aniZip_titles,
  bannerImage,
}) {
  //   const [torrentData, setTorrentData] = useState();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  let searchQueryRomaji = `${anime.romaji} ${englishDub ? "Dual Audio" : ""}`;
  if (data)
    searchQueryRomaji = `${anime.romaji} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  let searchQueryEnglish = `${anime.romaji} ${englishDub ? "Dual Audio" : ""}`;
  if (data)
    searchQueryEnglish = `${anime.english} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;

  let aniZipSearchQuery = {
    en: null,
    jp: null,
    xJat: null,
    malRomaji: null,
    malEnglish: null,
  };

  if (aniZip_titles?.en) {
    aniZipSearchQuery.en = `${aniZip_titles.en} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  }
  if (aniZip_titles?.ja) {
    aniZipSearchQuery.ja = `${aniZip_titles.ja} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  }
  if (aniZip_titles?.xJat) {
    aniZipSearchQuery.xJat = `${aniZip_titles.xJat} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  }
  if (aniZip_titles?.malTitleRomaji) {
    aniZipSearchQuery.malRomaji = `${aniZip_titles.malTitleRomaji} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  }
  if (aniZip_titles?.malTitleEnglish) {
    aniZipSearchQuery.malEnglish = `${aniZip_titles.malTitleEnglish} ${episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber} ${englishDub ? "Dual Audio" : ""}`;
  }

  // if the search query is same then a request won't be made twice as we are using the same query key
  const {
    isLoading: isLoadingRomaji,
    torrents: torrentDataRomaji,
    error: errorRomaji,
    status,
  } = useNyaaTracker(active ? searchQueryRomaji : null);

  const {
    isLoading: isLoadingEnglish,
    torrents: torrentDataEnglish,
    error: errorEnglish,
    status: statusEnglish,
  } = useNyaaTracker(active ? searchQueryEnglish : null);

  const {
    isLoading: anizip_xjat_loading,
    torrents: anizip_xjat_torrents,
    error: anizip_xjat_error,
    status: anizip_xjat_status,
  } = useNyaaTracker(active ? aniZipSearchQuery.xJat : null);

  const {
    isLoading: anizip_en_loading,
    torrents: anizip_en_torrents,
    error: anizip_en_error,
    status: anizip_en_status,
  } = useNyaaTracker(active ? aniZipSearchQuery.en : null);

  const {
    isLoading: anizip_malRomaji_loading,
    torrents: anizip_malRomaji_torrents,
    error: anizip_malRomaji_error,
    status: anizip_malRomaji_status,
  } = useNyaaTracker(active ? aniZipSearchQuery.malRomaji : null);

  const isLoading = isLoadingRomaji || isLoadingEnglish;
  const error = errorRomaji || errorEnglish;
  const [torrentData, setTorrentData] = useState([]);

  useEffect(() => {
    if (torrentDataRomaji?.data && torrentDataEnglish?.data) {
      // avoid duplicates
      const data = [...torrentDataRomaji.data, ...torrentDataEnglish.data];
      if (anizip_xjat_torrents?.data) {
        data.push(...anizip_xjat_torrents?.data);
      }
      if (anizip_en_torrents?.data) {
        data.push(...anizip_en_torrents?.data);
      }
      if (anizip_malRomaji_torrents?.data) {
        data.push(...anizip_malRomaji_torrents?.data);
      }

      const uniqueData = Array.from(new Set(data.map((a) => a.title))).map(
        (title) => {
          return data.find((a) => a.title === title);
        },
      );
      setTorrentData(uniqueData);
    }
  }, [
    torrentDataRomaji,
    torrentDataEnglish,
    anizip_xjat_torrents?.data,
    anizip_en_torrents?.data,
    anizip_malRomaji_torrents?.data,
  ]);

  // sort the torrents by seeders
  torrentData.sort((a, b) => b.seeders - a.seeders);

  function handleClick() {
    if (active) {
      setActive(false);
      return;
    }
    setActive((prevActive) => !prevActive);
  }

  function onTorrentClick(torrent) {
    navigate(`/player/${encodeURIComponent(torrent.magnet)}`);
  }

  // if the data is undefined, then it is a filler episode or a recap episode ot a movie
  if (data === undefined)
    return (
      <div
        onClick={() => handleClick()}
        className="relative m-1 cursor-default border border-gray-700 p-3 font-space-mono transition-all duration-100 ease-in-out hover:bg-[#1e1e20]"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-x-1 font-space-mono font-medium opacity-90">
            <div>
              <p className="flex gap-x-2 font-space-mono text-lg font-medium opacity-90">
                <span className="flex items-center gap-2 text-gray-400">
                  All <MagnifyingGlassIcon />
                </span>
                | {anime.romaji}
              </p>
            </div>
          </div>
        </div>
        {active && (
          <div className="mt-3 flex flex-col gap-y-2">
            {isLoading && <Skeleton width={"50%"} />}
            {error && (
              <p className="font-space-mono text-red-500">
                Error fetching torrents
              </p>
            )}

            {!isLoading && torrentData.length === 0 && (
              <p className="font-space-mono text-red-500">No torrents found</p>
            )}

            {torrentData?.map((torrent) => (
              <div className="flex animate-fade-down items-center animate-duration-500">
                <div className="flex min-w-20 items-center gap-x-1 border border-gray-800 p-1">
                  <p className="font-space-mono text-xs opacity-60">
                    {torrent.seeders}
                  </p>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="font-space-mono text-xs opacity-60">
                    {torrent.leechers}
                  </p>
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                </div>
                <p
                  key={torrent.title}
                  onClick={() => onTorrentClick(torrent)}
                  className="cursor-pointer font-space-mono text-sm tracking-wide opacity-55 hover:text-purple-400 hover:opacity-85"
                >
                  {torrent.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );

  // if the data is defined, then it is a normal episode
  return (
    <div
      onClick={() => handleClick()}
      className="m-1 cursor-default border border-gray-700 p-2 font-space-mono transition-all duration-100 ease-in-out hover:bg-[#1e1e20]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1 font-space-mono font-medium opacity-90">
          {data.thumbnail && (
            <img
              src={data.thumbnail}
              alt="episode_img"
              className="duration-400 hover:z-20 mr-3 h-24 animate-fade object-cover transition-all ease-in-out hover:scale-150 hover:rounded-md"
            />
          )}
          {/* <p className="text-lg">{episodeNumber}. </p> */}
          <div>
            <p className="font-space-mono text-lg font-medium opacity-90">
              {episodeNumber}. {data.title}
            </p>
            {data.overview && (
              <p className="font-space-mono text-sm font-medium opacity-60">
                {data.overview}
              </p>
            )}
          </div>
        </div>
        <div className="flex w-fit gap-x-2 text-xs opacity-60">
          {/* <p className="">{data.filler ? "Filler" : "Not Filler"}</p> */}
          {/* <p>{data.recap ? "Recap" : "Not Recap"}</p> */}
          <div className="ml-4 h-5 w-[1px] bg-[#333]"></div> {/* Divider */}
          {data.airdate && (
            <p className="text-nowrap opacity-60">
              {format(new Date(data.airdate), "dd MMMM yyyy")}
            </p>
          )}
          <div className="h-5 w-[1px] bg-[#333]"></div> {/* Divider */}
          {/* <p className="opacity-60">{data.score}</p> */}
        </div>
      </div>
      {active && (
        <div className="mt-3 flex flex-col gap-y-2">
          {isLoading && <Skeleton width={"50%"} />}
          {error && (
            <p className="font-space-mono text-red-500">
              Error fetching torrents
            </p>
          )}
          {!isLoading && torrentData.length === 0 && (
            <p className="font-space-mono text-red-500">No torrents found</p>
          )}
          {torrentData?.map((torrent) => (
            <div
              key={torrent.title}
              className="flex animate-fade-down items-center animate-duration-500"
            >
              <div className="flex min-w-20 items-center gap-x-1 border border-gray-800 p-1">
                <p className="font-space-mono text-xs opacity-60">
                  {torrent.seeders}
                </p>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="font-space-mono text-xs opacity-60">
                  {torrent.leechers}
                </p>
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
              </div>
              <p
                onClick={() => onTorrentClick(torrent)}
                className="cursor-pointer font-space-mono text-sm tracking-wide opacity-55 hover:text-purple-400 hover:opacity-85"
              >
                {torrent.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
