import AnimeCard from "../components/AnimeCard";
import useTopAiringAnime from "../hooks/useTopAiringAnime";
import zenshin1 from "../assets/zenshin2.png";
import zenshinLogo from "../assets/zenshinLogo.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTopAnime } from "../utils/helper";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@radix-ui/themes";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import loundraw from "../assets/loundraw.jpg";

export default function Home() {
  // GET RECENT GLOBAL ACTIVITY : UI NOT IMPLEMENTED
  // const {
  //   isLoading: isLoadingRecentActivity,
  //   data: recentActivity,
  //   error: errorRecentActivity,
  //   status: statusRecentActivity,
  // } = useGetRecentGlobalActivity();

  const { isLoading, topAiringAnime, error, status } = useTopAiringAnime();
  // const { isLoading2, topAnime, error2, status2 } = useGetTopAnime();
  // const { isLoading2, topAnime:topAnimeTS, error2, status2 } = useGetTopAnime();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error: infiniteQueryError,
  } = useInfiniteQuery({
    queryKey: ["top_animes"],
    queryFn: ({ pageParam = 1 }) => getTopAnime(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (infiniteQueryError) {
    toast.error("Error fetching Top Animes", {
      icon: <ExclamationTriangleIcon height="16" width="16" color="#ffffff" />,
      description: infiniteQueryError?.message,
      classNames: {
        title: "text-rose-500",
      },
    });
  }

  // if (error) {
  //   throw new Error(error);
  // }
  // const [page, setPage] = useState(1);

  // const [prevTopAnime, setPrevTopAnime] = useState([]);
  // const[topAnime, setTopAnime] = useState([]);

  // async function fetchMoreData() {
  // // const { isLoading2, topAnime:topAnimeTS, error2, status2 } = useGetTopAnime();
  // // const data = await getTopAnime(page);
  //   console.log(data); // Add this line to inspect the structure
  //   setPage(page + 1);
  //   setPrevTopAnime([...prevTopAnime, ...data.data]);
  //   setTopAnime([...topAnime, ...data.data]);
  // }

  // console.log(topAnime);

  // const topAnime = data?.pages?.flatMap((page) => page.data) || [];
  // console.log(topAnime);

  const [topAnime, setTopAnime] = useState([]);
  console.log(data);

  useEffect(() => {
    const extractTokenFromHash = () => {
      const hash = window.location.hash;

      if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove the # at the beginning
        const accessToken = params.get("access_token");
        const tokenType = params.get("token_type");
        const expiresIn = params.get("expires_in");

        if (accessToken) {
          // Store the access token in local storage
          localStorage.setItem("anilist_token", accessToken);
          console.log(`Access Token: ${accessToken}`);
          console.log(`Token Type: ${tokenType}`);
          console.log(`Expires In: ${expiresIn}`);

          // Optionally, you might want to clear the hash from the URL
          window.location.hash = "";

          toast.success("Successfully logged in to AniList", {
            icon: (
              <ExclamationTriangleIcon height="16" width="16" color="#ffffff" />
            ),
            classNames: {
              title: "text-green-500",
            },
          });
        }
      }
    };
    extractTokenFromHash();
    if (data) {
      const newTopAnime = data.pages
        .map((page) => page)
        .flat()
        .filter(Boolean);
      setTopAnime(newTopAnime);
    }
  }, [data]);

  /* ------------------------------------------------------ */

  const [watchingAnime, setWatchingAnime] = useState([]);
  const anilistToken = localStorage.getItem("anilist_token");
  const anilistId = localStorage.getItem("anilist_id");

  useEffect(() => {
    if (anilistToken) {
      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anilistToken}`,
        },
        body: JSON.stringify({
          query: `
            query ($userId: Int, $type: MediaType) {
              MediaListCollection(userId: $userId, type: $type) {
                lists {
                  name
                  entries {
                    media {
                      id
          idMal
          bannerImage
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          description
          episodes
          averageScore
          popularity
          startDate {
            year
            month
            day
          }
          format
                    }
                  }
                }
              }
            }
          `,
          variables: {
            userId: anilistId, // Replace with the actual user ID
            type: "ANIME", // Type can be either "ANIME" or "MANGA"
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            console.error("GraphQL error:", data.errors);
          } else {
            console.log("Media list collection:", data);
            setWatchingAnime(data?.data?.MediaListCollection?.lists[2]?.entries);
          }
        })
        .catch((error) =>
          console.error("Error fetching currently watching anime:", error),
        );
    }
  }, [anilistId, anilistToken]);

  // console.log(watchingAnime);

  // TOO LAZY TOO MAKE THIS RESPONSIVE
  return (
    <div className="font-space-mono tracking-tight">
      {/* <div className="to-purple-800-500 absolute left-40 top-[10rem] h-96 w-96 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 opacity-20 blur-[100px]"></div> */}

      <div
        className="flex min-h-[94svh] animate-fade flex-col items-center justify-around gap-y-11 lg:flex-row"
        style={{
          backgroundImage: `url(${loundraw})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full w-8/12 flex-col items-center justify-start gap-y-10 p-3 lg:w-2/5">
          <img
            src={zenshinLogo}
            alt=""
            className="h-[6rem] object-scale-down drop-shadow-xl"
          />
          <p className="font-space-mono">
            Stream your favourite torrents instantly with our service, no
            waiting for downloads, reliable and seamless streaming directly to
            your browser / VLC Media Player.
          </p>
        </div>

        <img
          src={zenshin1}
          alt="zenshin"
          className="h-48 object-scale-down drop-shadow-lg sm:h-64 md:h-80 lg:h-96"
        />
      </div>

      {error && (
        <div className="text-red-500">
          Failed to fetch Top Airing Anime : {error.message}
        </div>
      )}

      {status === "success" && !error && (
        <div className="mx-5 mt-8">
          <div className="mb-2 ml-8 border-b border-gray-700 pb-1 font-space-mono text-lg font-bold tracking-wider">
            Top Airing Anime
          </div>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {!isLoading &&
              !error &&
              topAiringAnime?.map((anime) => (
                <AnimeCard key={anime.id + "topAiringAnime"} data={anime} />
              ))}
          </div>
        </div>
      )}

      {infiniteQueryError && (
        <div className="text-red-500">
          Failed to fetch Top Anime : {infiniteQueryError.message}
        </div>
      )}

      {watchingAnime?.length > 0 && (
        <div className="mx-5 mt-8 animate-fade">
          <div className="mb-2 ml-8 border-b border-gray-700 pb-1 font-space-mono text-lg font-bold tracking-wider">
            Currently Watching Anime
          </div>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {!isLoading &&
              !error &&
              watchingAnime?.map((anime) => (
                <AnimeCard
                  key={anime.id + "topAiringAnime"}
                  data={anime.media}
                />
              ))}
          </div>
        </div>
      )}

      {!infiniteQueryError && topAnime.length > 0 && (
        <div className="mx-5 mt-12">
          <div className="mb-2 ml-8 border-b border-gray-700 pb-1 font-space-mono text-lg font-bold tracking-wider">
            Top Anime
          </div>
          <InfiniteScroll
            dataLength={topAnime.length}
            next={() => fetchNextPage()}
            hasMore={topAnime?.length < 500}
            loader={
              <div className="flex items-center justify-center gap-x-2 overflow-hidden">
                <h4>Loading...</h4>
                <Spinner />
              </div>
            }
          >
            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
              {topAnime?.map((anime) => {
                return <AnimeCard key={anime.id + "topAnime"} data={anime} />;
              })}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
