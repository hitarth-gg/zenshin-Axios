import { useEffect } from 'react';

const AnilistCaller = () => {
  useEffect(() => {
    const getAccessToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const tkn = params.get('access_token');
      console.log(tkn);

      // if (code) {
      //   const response = await fetch('https://anilist.co/api/v2/oauth/token', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       grant_type: 'authorization_code',
      //       client_id: '20712',
      //       client_secret: "CJ4k4sGJxsyIf7BKfilXiIcDPSXGvYqcynmJGpSX",
      //       redirect_uri: "http://localhost:5173/zenshin-axios/login",
      //       code: code,
      //     }),
      //   });

      //   const data = await response.json();
      //   // Save token to localStorage or state
      // }
        localStorage.setItem('anilist_token', tkn);
    };

    getAccessToken();
  }, []);

  return <div>Logging in...</div>;
};

export default AnilistCaller;
