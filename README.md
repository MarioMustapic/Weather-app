# Weather app.

Project is made as training in React and TS.

---

[**Try me on Netlify**](https://weather-app-mario-mustapic.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/41eb72ce-09e8-4085-a8a1-daa39818fac7/deploy-status)](https://app.netlify.com/sites/weather-app-mario-mustapic/deploys)

---

## Getting started

**Technologies**

-TypeScript
-React
-SCSS

**Requirements**

- Node.js 16.18.0+
- npm 8.19.2+

**First steps**

1. Clone this repository
2. Run `npm install`
3. Run `npm start`

## Scripts

### `npm run start`

Start the development environment.

### `npm run build`

Build the project for production.

## Features

- [x] Gets your current position using geolocation (asking for permission to use your location)
- [x] Use cords to send API req from https://api.open-meteo.com
- [x] Show received weather data in cards : current, next 24h and next 7 days

## Roadmap

- [ ] Finalize autocomplete city searchbar to set location manually :
  - [x] Get API key from google maps and set component to handle that task
  - [] Setup database to store that key and server to use when it receives req for weather data, send req to google map API and then forward data to client

[ ] Add some graphs etc to show more data
[ ] Make it possible to select from more than one weather API
[ ] Make graph comparing same data from different API-s, or calculate average using data from multiple ones
...
