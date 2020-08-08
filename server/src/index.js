require('dotenv').config();
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import schema from './schema/schema';
import client_credentials from './auth/client-credentials';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

function errorMsg(error) {
  if (error) {
    const { status = '', message = 'no details' } = error;
    return `Error: ${status}: ${message}`;
  }
  return 'An unknown error!';
}

function throwExceptionOnError(data) {
  if (data.error) {
    throw new Error(errorMsg(data.error));
  }
}

const headers = {
  Accept: 'application/json',
  Authorization: '',
  'Access-Control-Allow-Origin': '*',
};

let awaitingAuthorization;

const spotifyProxy = () => {
  if (awaitingAuthorization && !client_credentials.isExpired()) {
    // use existing promise, if not expired
    return awaitingAuthorization;
  }
  if (!awaitingAuthorization || client_credentials.isExpired()) {
    awaitingAuthorization = new Promise((resolve, reject) => {
      client_credentials
        .authenticate()
        .then((token) => {
          headers.Authorization = 'Bearer ' + token.access_token;
          resolve(headers);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return awaitingAuthorization;
};

const haveHeadersWithAuthToken = async () => {
  return await spotifyProxy();
};

const playlistQuery = async ({ name }) => {
  console.log(`debug: query artist ${name} `);

  const response = await fetch(
    `https://api.spotify.com/v1/users/${name}/playlists`,
    {
      headers: await haveHeadersWithAuthToken(),
    }
  );

  const data = await response.json();
  throwExceptionOnError(data);

  return (data.items || []).map((albumRaw) => spotifyJsonToAlbum(albumRaw));

  //   console.log(data);
};
const userQuery = async ({ name }) => {
  console.log(`debug: query artist ${name} `);

  const response = await fetch(`https://api.spotify.com/v1/users/${name}`, {
    headers: await haveHeadersWithAuthToken(),
  });

  const data = await response.json();
  throwExceptionOnError(data);

  return spotifyJsonToUser(data);
};

const getPlaylistTracks = async ({ id }) => {
  console.log(`debug: query artist ${id} `);
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      headers: await haveHeadersWithAuthToken(),
    }
  );
  const data = await response.json();
  throwExceptionOnError(data);

  return (data.items || []).map((albumRaw) => spotifyJsonToPlaylist(albumRaw));
};

const spotifyJsonToPlaylist = (playlistTracks) => {
  let namese = playlistTracks.track.artists.map((artist) => {
    return artist.name;
  });

  return namese[0];
};

const spotifyJsonToUser = (userProfile) => {
  return {
    // fills with raw data (by ES6 spread operator):
    ...userProfile,
    followers: userProfile.followers.total,
    image: userProfile.images[0].url,
    // This needs extra logic: defaults to an empty string, if there is no image
    // else: just takes URL of the first image
    // image: albumRaw.images[0] ? albumRaw.images[0].url : '',

    tracks: ['dsads'], // TODO implement fetching of tracks of album
  };
};

const spotifyJsonToAlbum = (albumRaw) => {
  return {
    // fills with raw data (by ES6 spread operator):
    ...albumRaw,
    playlistId: albumRaw.id,

    // This needs extra logic: defaults to an empty string, if there is no image
    // else: just takes URL of the first image
    image: albumRaw.images[0] ? albumRaw.images[0].url : '',

    tracks: ['dsads'], // TODO implement fetching of tracks of album
  };
};

const resolvers = {
  Query: {
    queryPlaylist: (parent, args, context, info) => playlistQuery(args),
    queryUser: (parent, args, context, info) => userQuery(args),
    getTracks: (parent, args, context, info) => getPlaylistTracks(args),
  },
};

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // <-- REQUIRED backend setting
};

const server = new ApolloServer({
  typeDefs: schema,
  cors: cors(corsOptions),
  resolvers,
});
server.applyMiddleware({
  app,
  cors: corsOptions,
});

app.listen({ port: 4000 }, () => {
  console.log(
    `Server is running on http://localhost:4000${server.graphqlPath}`
  );
});
