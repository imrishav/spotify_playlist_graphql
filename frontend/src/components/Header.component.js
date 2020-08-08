import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import styled from 'styled-components';
import { PlaylistContext } from '../context/PlaylistContext';
import { mapArtistName } from '../utils/mapArtistName';

const getPlaylistTrack = gql`
  query getPlaylistTrack($id: String) {
    getTracks(id: $id)
  }
`;

const HeaderStyle = styled.div`
  /* box-shadow: 4px 4px 4px 1px #88888861; */
  -webkit-box-shadow: 0 8px 6px -11px black;
  -moz-box-shadow: 0 8px 6px -11px black;
  box-shadow: 0 8px 6px -11px black;
  nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 7vh;
    border-radius: 17px;
    background: #ffffff;
    color: black;
  }

  .nav-links {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    color: black;
  }

  .navStyle {
    color: black;
    text-decoration: none;
  }

  .nav__submenu {
    display: none;
  }

  .nav__menu-item:hover {
    .nav__submenu {
      display: block;
      z-index: 1;
    }
  }
  .nav__menu-item {
    display: inline-block;
    position: relative;

    &:hover {
      background-color: white;

      .nav__submenu {
        display: block;
      }
    }
  }

  .spanText {
    font-size: 20px;
    margin: 10px;
    &:hover {
      background-color: #8657ff;
    }
  }

  .nav__submenu {
    font-weight: 300;
    text-transform: none;
    position: absolute;
    width: 180px;
    background-color: white;
    padding: 0;
    padding-top: 14px;
  }

  .nav__submenu-item {
    &:hover {
      padding: 9px;
      background-color: #8657ff;
      color: white;
      margin: 5px;
      /* background: rgba(#000, 0.1); */
    }
  }
`;

const style = {
  color: 'blue',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const SubMenu = ({ featured }) => {
  const uniqueArtists = mapArtistName([...new Set(featured)]);

  return (
    <ul className="nav__submenu nav-links">
      {uniqueArtists.map((artistName) => {
        return (
          <li key={artistName} className="nav__submenu-item">
            <a>
              <span className="spanText" style={{ fontSize: '20px' }}>
                {artistName}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const Header = () => {
  const {
    state: { currentPlaylist },
    dispatch,
  } = useContext(PlaylistContext);
  const { loading, error, data } = useQuery(getPlaylistTrack, {
    variables: { id: currentPlaylist.id || '0vvXsWCC9xrXsKd4FyS8kM' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Fetching, Please Refresh </p>;

  return (
    <HeaderStyle>
      <nav>
        <ul className="nav-links">
          <li style={{ textDecoration: 'none' }}>
            <NavLink className="navStyle" activeStyle={style} to="/" exact>
              Home
            </NavLink>{' '}
          </li>
          <li style={{ textDecoration: 'none' }}>
            <NavLink
              className="navStyle"
              activeStyle={style}
              to="/playlist"
              exact
            >
              Playlist
            </NavLink>{' '}
          </li>
          <li className="nav__menu-item" style={{ textDecoration: 'none' }}>
            <NavLink
              className="navStyle"
              activeStyle={style}
              to="/featured"
              exact
            >
              Featured
            </NavLink>{' '}
            <SubMenu featured={data.getTracks} />
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  );
};

export default Header;
