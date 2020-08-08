import React, { useState, createContext, useReducer } from 'react';

const intialState = {
  currentPlaylist: '',
  artistFromCurrentPlaylist: [],
};

function reducer(state, action) {
  return { ...state, ...action };
}
export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};
