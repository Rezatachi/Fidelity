import React from "react";

//Imported functions

const Song = ({ currentSong, isPlaying }) => {
  return (
    <div>
      <div className="song-container">
        <img
          className={isPlaying ? "rotateSpin" : "pause"}
          src={currentSong.cover}
          alt={currentSong.name}
        ></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;
