import { mockData } from './mock-data';
import NProgress from 'nprogress';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch('https://4cojg4f31j.execute-api.eu-north-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
};


const checkToken = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
  const result = await response.json();
  return result;
};


const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};




export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};


export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data?JSON.parse(events).events:[];;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 'https://4cojg4f31j.execute-api.eu-north-1.amazonaws.com/dev/api/get-events' + '/' + token;

    const response = await fetch(url)
    const result = await response.json();

    if (result) {
      var locations = extractLocations(result.events);
      localStorage.setItem("lastEvents", JSON.stringify(result));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    if (!code) {
      const response = await fetch("https://4cojg4f31j.execute-api.eu-north-1.amazonaws.com/dev/api/get-auth-url")
      const results = await response.json();
      console.log(results);
      const { authUrl } = results;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
}