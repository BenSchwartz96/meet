const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

//SCOPES allows you to set access levels; this is set to readonly for now because you don't have access rights to update the calendar yourself.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

//Credentials are the values required to get access to the calendar. "process.env" refers to the value in the "config.json" file, which is good practice because it keeps API secrets hidden.
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://BenSchwartz96.github.io/meet/"],
  javascript_origins: ["https://BenSchwartz96.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id} = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//First step in the OAuth process is to generate a URL so users can log in with google
//and be authorised to see the calendar. After logging in they get a code as a URL parameter

module.exports.getAuthURL = async () => {

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

    // Decode authorization code extracted from the URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);


    //Exchange authorization code for access token with a “callback” after the exchange. The callback in this case is an arrow function with the results as parameters: "err" and "token."
    return new Promise((resolve, reject) => {

      oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      //We respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      //Handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};
