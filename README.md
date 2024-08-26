# zenshin. <img src="https://github.com/user-attachments/assets/87dd28e0-8c0a-43ce-a953-f58c604ccf62" width="23">

<img src="https://github.com/user-attachments/assets/af797fd4-e7ca-428f-82fc-c50d13b9407c" width="120">

A web based anime torrent streamer which can stream torrents in the browser and on the VLC media player as well.

Built it as a mini project to familiarize myself with video streaming using ExpressJS and handling of streams and APIs in a ReactJS based frontend webapp.

![image](https://github.com/user-attachments/assets/dad59995-f2e5-4a27-b933-d16c762bbe42)
![image](https://github.com/user-attachments/assets/9abe8f0f-3eef-405c-b595-924cd2276b6b)
![image](https://github.com/user-attachments/assets/5b2f79f7-85a4-4532-b5af-e1f3e5eeeb71)
![image](https://github.com/user-attachments/assets/4e3ec7cf-2fec-4c1c-8a1d-d07dfbda2f53)
![image](https://github.com/user-attachments/assets/bec74950-27c7-4b1a-ac7c-974e6d699739)
![image](https://github.com/user-attachments/assets/e9baf709-dc2a-4b90-95b2-ff4dcfdd986d)
![image](https://github.com/user-attachments/assets/1341c03b-0674-4d70-be95-e4d1bff3119e)
![image](https://github.com/user-attachments/assets/ab95917b-11f5-4f02-a73f-43cfa2afc40f)

---

Note: The video player in the browser currently does not support subtitle rendering as extracting embedded subtitles from an mkv file is quite tricky and is way out of my league. To play the video with subtitles open it in VLC by clicking on the `Open VLC` button when playing an episode.

### VLC Media Player Support
Define the path to vlc.exe in BACKEND/server.js : 

```js
  const vlcPath = '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe"'; // Adjust this path as needed
```

---

### Disclaimer

This website is a personal project created for educational purposes only, intended as a tool to learn and explore web development technologies. We do not own, host, or store any of the content available through this platform, including any anime torrents. All torrents accessible through this site are sourced from third-party websites and are not under our control.

We do not endorse or condone piracy or the unauthorized distribution of copyrighted content. Users are responsible for ensuring that their actions comply with local laws and regulations. By using this website, you acknowledge that this project is purely for educational exploration, and any use of the content provided is at your own discretion and risk.

If you are a content owner and believe that your rights are being violated, please contact the relevant third-party sources directly.

---

### How to use / build : 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/DiVczJ92sAU/0.jpg)](https://www.youtube.com/watch?v=DiVczJ92sAU)

[YouTube: How to use / build](https://youtu.be/DiVczJ92sAU?si=NvqnDvXE_LW7EHW8)

---

### Tech Stack and dependencies used :
- ReactJS
- WebTorrent
- TanStack React Query
- Radix UI and Radix Icons
- Video.js
- axios
- date-fns
- ldrs
- react-infinite-scroll-component
- TailwindCSS w/ tailwindcss-animated and line-clamp
- ExpressJS
- Nyaa-API : https://github.com/Vivek-Kolhe/Nyaa-API
