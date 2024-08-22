import express from "express";
import WebTorrent from "webtorrent";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { exec } from "child_process";
import { get } from "http";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------- HANDLING THE DIRECTORIES -------------- */

// directory where server.js is located
const currentDir = path.join(__dirname, "downloads");

console.log(currentDir);

// if the "downloads" folder is not present, create it
if (!fs.existsSync(currentDir)) {
  fs.mkdirSync(currentDir, { recursive: true });
}
/* ------------------------------------------------------ */
const app = express();
const client = new WebTorrent();

app.use(cors());

/* ------------- CHECK LATEST GITHUB RELEASE ------------ */
const owner = "hitarth-gg"; // Replace with the repository owner
const repo = "zenshin"; // Replace with the repository name
const currentVersion = "v1.0.0"; // Replace with the current version

const getLatestRelease = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.tag_name !== currentVersion) {
      console.log(chalk.blue("New version available:", data.tag_name));
      console.log("Release notes:", data.body);
      console.log(
        chalk.yellow(
          "Download URL: https://github.com/hitarth-gg/zenshin/releases"
        )
      );
    }
  } catch (error) {
    console.error("Error fetching latest release:", error);
  }
};
getLatestRelease();
/* ------------------------------------------------------ */

/* ------------------ PING THE BACKEND ------------------ */
// check if the backend is running
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

/* -------------- GET METADA OF THE TORRENT ------------- */

app.get("/metadata/:magnet", async (req, res) => {
  let magnet = req.params.magnet;

  // Check if the torrent is already added
  let existingTorrent = await client.get(magnet);
  console.log("Existing torrent:", existingTorrent);

  // If torrent is already added, return its file information
  if (existingTorrent) {
    let files = existingTorrent.files.map((file) => ({
      name: file.name,
      length: file.length,
    }));
    // console.log("Existing torrent files:", files);

    return res.status(200).json(files);
  }

  // If torrent is not added, add it
  const torrent = client.add(magnet, { deselect: true, path: currentDir }); // "deselect: true" is used to download the metadata of the torrent only and ignore all the files present in the torrent

  torrent.on("metadata", () => {
    const files = torrent.files.map((file) => ({
      name: file.name,
      length: file.length,
    }));
    console.log(files);

    res.status(200).json(files); // return the list of files in the torrent
  });
});
/* ------------------------------------------------------ */

/* --------------- STREAM A SELECTED FILE --------------- */
app.get("/streamfile/:magnet/:filename", async function (req, res, next) {
  let magnet = req.params.magnet;
  let filename = req.params.filename;

  console.log(magnet);

  let tor = await client.get(magnet);

  if (!tor) {
    return res.status(404).send("Torrent not found");
  }

  let file = tor.files.find((f) => f.name === filename);
  console.log("file :" + file.toString());

  if (!file) {
    return res.status(404).send("No file found in the torrent");
  }
  console.log(file);

  file.select();

  let range = req.headers.range;

  console.log("Range : " + range);

  if (!range) {
    return res.status(416).send("Range is required");
  }

  let positions = range.replace(/bytes=/, "").split("-");
  let start = parseInt(positions[0], 10);
  let file_size = file.length;
  let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
  let chunksize = end - start + 1;

  let head = {
    "Content-Range": `bytes ${start}-${end}/${file_size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunksize,
    "Content-Type": "video/x-matroska",
  };

  res.writeHead(206, head);

  let stream_position = {
    start: start,
    end: end,
  };

  let stream = file.createReadStream(stream_position);
  stream.pipe(res);

  stream.on("error", function (err) {
    console.error("Stream error:", err);
    // Only send a response if headers haven't been sent yet
    if (!res.headersSent) {
      return res.status(500).send("Error streaming the video");
    }
  });

  stream.on("close", () => {
    console.log("Stream closed prematurely");
  });
});
/* ------------------------------------------------------ */

/* ----- GET DOWNLOAD DETAILS OF THE ENTIRE TORRENT ----- */
app.get("/details/:magnet", async (req, res) => {
  let magnet = req.params.magnet;

  // Find the torrent by magnet link
  let tor = await client.get(magnet);
  if (!tor) {
    return res.status(404).send("Torrent not found");
  }

  // Prepare torrent details
  let details = {
    name: tor.name,
    length: tor.length,
    downloaded: tor.downloaded,
    uploaded: tor.uploaded,
    downloadSpeed: tor.downloadSpeed,
    uploadSpeed: tor.uploadSpeed,
    progress: tor.progress,
    ratio: tor.ratio,
    numPeers: tor.numPeers,
  };

  res.status(200).json(details);
});
/* ------------------------------------------------------ */

/* -------- GET DOWNLOAD DETAILS OF SELECTED FILE ------- */
app.get("/detailsepisode/:magnet/:filename", async (req, res) => {
  let magnet = req.params.magnet;
  let filename = req.params.filename;

  let tor = await client.get(magnet);
  if (!tor) {
    return res.status(404).send("Torrent not found");
  }

  let file = tor.files.find((f) => f.name === filename);
  if (!file) {
    return res.status(404).send("No file found in the torrent");
  }

  let details = {
    name: file.name,
    length: file.length,
    downloaded: file.downloaded,
    progress: file.progress,
  };

  res.status(200).json(details);
});
/* ------------------------------------------------------ */

/* --------------- Handling VLC streaming --------------- */
// Full path to VLC executable, change it as needed
const vlcPath = '"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe"'; // Adjust this path as needed

app.get("/stream-to-vlc", async (req, res) => {
  const { url, magnet } = req.query;

  if (!url) {
    return res.status(400).send("URL is required");
  }
  const vlcCommand = `${vlcPath} "${url}"`;

  exec(vlcCommand, (error) => {
    if (error) {
      console.error(`Error launching VLC: ${error.message}`);
      return res.status(500).send("Error launching VLC");
    }
    res.send("VLC launched successfully");
  });
});
/* ------------------------------------------------------ */

/* -------------- REMOVE THE ENTIRE TORRENT ------------- */
app.delete("/remove/:magnet", async (req, res) => {
  let magnet = req.params.magnet;

  // Find the torrent by magnet link
  let tor = await client.get(magnet);
  if (!tor) {
    return res.status(404).send("Torrent not found");
  }

  // Destroy the torrent to stop downloading and remove it from the client
  tor.destroy((err) => {
    if (err) {
      console.error("Error removing torrent:", err);
      return res.status(500).send("Error removing torrent");
    }

    res.status(200).send("Torrent removed successfully");
  });
});
/* ------------------------------------------------------ */


/* ------------------ START THE SERVER ------------------ */
app.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
  });
