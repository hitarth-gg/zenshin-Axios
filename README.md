# zenshin. <img src="https://github.com/user-attachments/assets/87dd28e0-8c0a-43ce-a953-f58c604ccf62" width="23">

<img src="https://github.com/user-attachments/assets/af797fd4-e7ca-428f-82fc-c50d13b9407c" width="120">

A web based anime torrent streamer which can stream torrents in the browser and on the VLC media player as well.

Built it as a mini project to familiarize ourselves with video streaming using ExpressJS and handling of streams and APIs in a ReactJS based frontend webapp.

![image](https://github.com/user-attachments/assets/2d255826-1384-454a-b41d-a96cd703ea01)
![image](https://github.com/user-attachments/assets/1504eaee-e2e5-49f4-8a67-4358e34ca385)
![image](https://github.com/user-attachments/assets/21c0b5bd-403a-414f-b049-cf71fd0948b5)
![image](https://github.com/user-attachments/assets/94d683b5-53b9-4da9-af50-6db806beed1f)
![image](https://github.com/user-attachments/assets/1e81c354-a869-44da-8782-791be96c599f)
![image](https://github.com/user-attachments/assets/5fd8edf4-058e-4897-83ce-7b8d0b587e3e)
![image](https://github.com/user-attachments/assets/1df24a1d-3cfd-4467-8728-92c0f8cf6540)
![image](https://github.com/user-attachments/assets/dbdf823b-d6f5-4d7b-bd69-a71016347edc)
![image](https://github.com/user-attachments/assets/be39431e-ebc9-40e7-87b4-ccc5a99ead2f)
![image](https://github.com/user-attachments/assets/f42404db-c3b3-4ae8-ac74-bf5e5b1f01e7)



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
