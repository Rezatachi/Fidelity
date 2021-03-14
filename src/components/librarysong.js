import React from "react";
import { Card, CleanButton } from "react-sensei";
//Imported functions

const Libsong = ({
  song,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setsongs,
  id,
}) => {
  //  {/* Here you are mapping the song prop across the Libsong component(during this you are also changing the prop name to song for Libsong) */}

  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong({ ...selectedSong[0] });
    //Add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setsongs(newSongs);

    //Play audio
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`lib-song-container ${song.active ? "selected" : " "}`}
    >
      {/* we can toggle a class based on our state using backtics*/}
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default Libsong;
