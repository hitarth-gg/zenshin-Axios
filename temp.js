// var request = require("request");

const client_id = "20702";
const client_secret = "TJdinjOYlG728q18Zn7zxu0r1ah2HYl4Llk2z9r8";
const redirect_uri = "http://localhost:3000/callback";
const code =
  "def50200140401b1da6a059b0d65d0ecb19c33faf48ee408e9269ae515a7affab1598eb40adb3ff3e86a34b41fcaeb2d5ee8e5f5a719421f0bc946f5735ae6af4a6e677a006093a5db7144caa73a7ed96e6784f75d23bccdb0d1ae3f42b3c02854d0ae157708c2eb79496b9807012d230d85d79c2b7f0339feb392efe9840f4841f5db7220a4487125ad480f6b7d000b40ffa0375f26aa737c5e01557926af5c4964388f13ec588886833cf0679830f2e733ed7df86b5b89f1fb7d3eda78e2378d0dbdf4aaf07fb98f688c6b3578175bbf81546b1fff569158d39c8946842f22926443249631179d1b2782cd66b123e83d11496e2424bb2190abeaa50e47b88173701edcb17741e559733d763d7b92ca0eada210c9d30da720f2110fc4dd041bd67c2925f1e44cf336eefafc0138316d8f10574c3f09e746f869d79b9834c66d2e44ecdc0d636311e97a96f6c31ef6d4171985ae3f5c11ab995cd71eba07618f35d65262e258f6dc830a";

var options = {
  uri: "https://anilist.co/api/v2/oauth/token",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  json: {
    grant_type: "authorization_code",
    client_id: `${client_id}`,
    client_secret: `${client_secret}`,
    redirect_uri: `${redirect_uri}`, // http://example.com/callback
    code: `${code}`, // The Authorization Code received previously
  },
};

// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
// console.log(body.access_token);
//   }
// });

async function fetchAccessToken(code) {
  const response = await fetch("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      code: code,
    }),
  });

  const data = await response.json();
  console.log(data);
  
  if (data.access_token) {
    // Store the access token in localStorage or state
    // localStorage.setItem("anilist_token", data.access_token);
    console.log(data.access_token);
    // navigate("/"); // Navigate back to the home page or dashboard
  }
}

fetchAccessToken(code);
