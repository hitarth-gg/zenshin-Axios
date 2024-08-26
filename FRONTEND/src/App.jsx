import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AnimePage from "./pages/AnimePage";
import Player from "./pages/Player";
import Favorite from "./pages/FavoritePage";
import NewReleases from "./pages/NewReleases";
import AnilistCaller from "./pages/AnilistCaller";
import ReverseImageSearch from "./pages/ImageSearch";

// import { lazy } from "react";

// const AnimePage = lazy(() => import("./pages/AnimePage"));
// const Player = lazy(() => import("./pages/Player"));

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <AppLayout props={<ErrorPage />} />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/anime/:animeId",
          element: <AnimePage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/player/:magnetId",
          element: <Player />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/newreleases",
          element: <NewReleases />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/favorites",
          element: <Favorite />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/login",
          element: <AnilistCaller />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/imagesearch",
          element: <ReverseImageSearch />,
          errorElement: <ErrorPage />,
        }
        
      ],
    },
  ],
  {
    basename: "/zenshin-axios",
  },
);

function App() {

  // the idea of integrating react-query is similar to that of context api
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000, // staleTime is the time in milliseconds after which the data is considered stale
      staleTime: 0,
    },
  },
});


  return (
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
