import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import zenshinLogo from "../assets/zenshinLogo.png";
import {
  CameraIcon,
  DividerVerticalIcon,
  GitHubLogoIcon,
  MoonIcon,
  ShadowIcon,
  ShadowNoneIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useZenshinContext } from "../utils/ContextProvider";
// const YOUR_REDIRECT_URI= "http://localhost:5173/zenshin-axios/login"
const YOUR_CLIENT_ID = 20712;
const anilistAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${YOUR_CLIENT_ID}&response_type=token`;
/* ------------------------------------------------------ */

export default function Header({ theme, toggleTheme }) {
  const zenshinContext = useZenshinContext();
  function toggleGlow() {
    zenshinContext.setGlow(!zenshinContext.glow);
  }

  const navigate = useNavigate();
  const handleLogin = () => {
    window.location.href = anilistAuthUrl;
  };
  // get anilist_token from local storage
  const [anilistToken, setAnilistToken] = useState(
    localStorage.getItem("anilist_token") || "",
  );
  const [userProfile, setUserProfile] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("anilist_token");
    localStorage.removeItem("anilist_id");
    localStorage.removeItem("anilist_name");
    setAnilistToken("");
    setUserProfile(null);
    // refresh the page
    window.location.reload();
  };

  useEffect(() => {
    // Check if token exists in the URL hash and set it
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const token = new URLSearchParams(hash.replace("#", "?")).get(
        "access_token",
      );
      if (token) {
        localStorage.setItem("anilist_token", token);
        setAnilistToken(token);
        window.location.hash = ""; // Remove the token from the URL for security
      }
    }

    if (anilistToken) {
      // Fetch user data from AniList API
      fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${anilistToken}`,
        },
        body: JSON.stringify({
          query: `
            query {
              Viewer {
                id
                name
                avatar {
                  large
                }
              }
            }
          `,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("anilist_id", data.data.Viewer.id);
          localStorage.setItem("anilist_name", data.data.Viewer.name);
          setUserProfile(data.data.Viewer);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [anilistToken]);

  /* ------------------------------------------------------ */

  return (
    <div className="sticky top-0 z-20 flex h-12 items-center justify-between border-[#5a5e6750] bg-[#111113] bg-opacity-60 px-4 py-3 backdrop-blur-md">
      <div className="flex w-full items-center justify-start gap-x-2">
        <Link
          className="hover: font-spaceMono flex w-fit cursor-pointer select-none gap-x-2 rounded-sm p-1 text-sm transition-all duration-200 hover:bg-[#70707030]"
          to={"/"}
        >
          {/* <span>zenshin | 全身</span> */}
          <img src={zenshinLogo} alt="" className="w-16" />
        </Link>
        <DividerVerticalIcon width={20} height={20} color="#ffffff40" />
        <Button color="gray" variant="ghost" size={"1"}>
          <a
            href="https://github.com/hitarth-gg/zenshin-axios"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubLogoIcon className="my-1" width={17} height={17} />
          </a>
        </Button>
        <DividerVerticalIcon width={20} height={20} color="#ffffff40" />
        <Button color="gray" variant="ghost" size={"1"}>
          <Link to="/newreleases">
            <div className="p-1 font-space-mono text-[.8rem]">New Releases</div>
          </Link>
        </Button>
        {window.location.pathname === "/zenshin-axios/favorites" ? (
          <div></div>
        ) : (
          <>
            <DividerVerticalIcon width={20} height={20} color="#ffffff40" />
            <Button color="gray" variant="ghost" size={"1"}>
              <Link to="/favorites">
                <div className="p-1 font-space-mono text-[.8rem]">
                  Favorites
                </div>
              </Link>
            </Button>
          </>
        )}
        {window.location.pathname === "/zenshin-axios/imagesearch" ? (
          <div></div>
        ) : (
          <>
            <DividerVerticalIcon width={20} height={20} color="#ffffff40" />
            <Link target="_blank" to="/imagesearch">
              <Button color="gray" variant="ghost" size={"1"}>
                <div className="p-1 font-space-mono text-[.8rem]">
                  <CameraIcon width={16} height={16} />
                </div>
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="w-11/12">
        <SearchBar />
      </div>
      <div className="flex w-full items-center justify-end gap-x-8">
        {!anilistToken && (
          <Button color="gray" variant="ghost" size={"1"} onClick={handleLogin}>
            <div className="p-1 font-space-mono text-[.8rem]">
              Login to Anilist
            </div>
          </Button>
        )}
        {userProfile && (
          // <div className="flex animate-fade items-center gap-x-2">
          //   <img
          //     src={userProfile.avatar.large}
          //     alt="avatar"
          //     className="w-6 h-6 rounded-full"
          //   />
          //   <div className="font-space-mono text-[.8rem]">
          //     {userProfile.name}
          //   </div>
          // </div>
          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger>
              <Button variant="ghost" color="gray">
                <div className="flex animate-fade items-center gap-x-2">
                  <img
                    src={userProfile.avatar.large}
                    alt="avatar"
                    className="h-6 w-6 rounded-full"
                  />
                  <div className="font-space-mono text-[.8rem]">
                    {userProfile.name}
                  </div>
                </div>
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                  <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Item color="red" onClick={handleLogout}>
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {/* <Link target="_blank" to="https://github.com/hitarth-gg/zenshin">
          <Button color="gray" variant="ghost" size={"1"}>
            <div className="p-1 text-[.8rem]">How to use</div>
          </Button>
        </Link> */}
        <Button
          color="gray"
          variant="ghost"
          size={"1"}
          onClick={() => toggleGlow()}
        >
          {zenshinContext.glow ? (
            <ShadowIcon className="my-1" width={16} height={16} />
          ) : (
            <ShadowNoneIcon className="my-1" width={16} height={16} />
          )}
        </Button>
      </div>
    </div>
  );
}
