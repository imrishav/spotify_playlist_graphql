import React from 'react';
import { useQuery, gql } from '@apollo/client';
import SliderComponent from '../components/Slider.component';
import styled from 'styled-components';

const OverviewWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  height: 48vh;
  border-radius: 19px;
`;
const PLAYLIST_QUERY = gql`
  query {
    queryPlaylist(name: "chilledcow") {
      name
      description
      image
      id
    }
  }
`;

const Playlist = () => {
  const { loading, error, data } = useQuery(PLAYLIST_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching, Please Refresh </p>;
  return (
    <OverviewWrapper>
      <SliderComponent playlists={data.queryPlaylist} />
    </OverviewWrapper>
  );
};

export default Playlist;
