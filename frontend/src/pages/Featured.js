import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import { PlaylistContext } from '../context/PlaylistContext';

const getPlaylistTrack = gql`
  query getPlaylistTrack($id: String) {
    getTracks(id: $id)
  }
`;

const Featured = () => {
  const {
    state: { currentPlaylist },
    dispatch,
  } = useContext(PlaylistContext);
  const { loading, error, data } = useQuery(getPlaylistTrack, {
    variables: { id: currentPlaylist.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching, Please Refresh </p>;
  return <div></div>;
};

export default Featured;
