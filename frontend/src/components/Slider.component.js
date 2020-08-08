import React, { useState, useContext, useEffect } from 'react';
import { PlaylistContext } from '../context/PlaylistContext';

import Slider from 'react-slick';
import '../App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const SLiderStyle = styled.div`
  margin: 29px 10px 10px 80px;
  .sample {
    margin-left: auto;
    margin-right: auto;
    width: 400px;
  }

  .slick-arrow {
    border: 1px solid #8657ff;
    border-radius: 47px;
  }

  .slick-arrow:before {
    font-size: 30px;
    margin-left: -14px;
    line-height: 0;
    color: #8657ff;
  }

  .slick-next {
    position: absolute;
    right: 1px;
    padding: 29px;
  }

  .slick-prev {
    position: absolute;
    left: -79px;
    padding: 29px;
  }
`;

const SliderComponent = ({ playlists }) => {
  const {
    state: { currentPlaylist },
    dispatch,
  } = useContext(PlaylistContext);
  const [currentPlaylistState, setCurrentPlaylist] = useState(playlists[0]);

  const settings = {
    dots: false,
    className: 'sample',
    beforeChange: (current, index) => {
      setCurrentPlaylist(playlists[index]);
    },
  };

  useEffect(() => {
    dispatch({ currentPlaylist: currentPlaylistState });
  }, [currentPlaylistState]);

  return (
    <SLiderStyle>
      <Slider {...settings}>
        {playlists.map(({ name, image }) => {
          return (
            <>
              <img
                src={image}
                height="320px"
                style={{ borderRadius: '19px' }}
              />
              <p style={{ textAlign: 'start', fontWeight: 'bold' }}>{name}</p>
            </>
          );
        })}
      </Slider>
    </SLiderStyle>
  );
};

export default SliderComponent;
