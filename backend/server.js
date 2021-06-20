import express from "express";
import request from "request";
import cors from "cors";
import querystring from "querystring";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const app = express();

app.use(cors());

app.get("/login", (req, res) => {
  const scope = "user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(`${client_id}:${client_secret}`).toString("base64"),
    },
    json: true,
  };
  request.post(authOptions, (err, response, body) => {
    console.log(body);
    const access_token = body.access_token;
    const uri = process.env.FRONTEND_URI;
    res.redirect(`${uri}?access_token=${access_token}`);
  });
});

console.log("listening on 8888");
app.listen(8888);
