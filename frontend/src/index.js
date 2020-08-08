import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PlaylistProvider } from './context/PlaylistContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: false,
});

ReactDOM.render(
  <React.StrictMode>
    <PlaylistProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </PlaylistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
