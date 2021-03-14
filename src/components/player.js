import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

//Imported functions

const Player = ({
  currentSong,
  isPlaying,
  setisPlaying,
  audioRef,
  SongInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setsongs,
}) => {
  // The dangers of use effect^:: The UseEffect will still run, causing unneccsary actions. In this case, the player.js and the libsong js use the same code causing useEffect to update twice.

  const activeLibraryHander = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        // Check the NEXT one and set it the ACTIVE
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
  };
  //Events
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...SongInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    //Try to get all the songs and where we are in the array list
    // First we need to get an index, 1-7 in the array
    //If the current songid = the song id, that is our current Index
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHander(songs[(currentIndex + 1) % songs.length]);
      // Creates a promise and waits.
      // Grab the curerent index, and add it to move to the next song's array
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHander(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
        // If the index is -1 a.k.a the song number is lower than -1, go back to the end;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHander(songs[(currentIndex - 1) % songs.length]);
      // Grab the curerent index, and add it to move to the next song's array
    }
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(SongInfo.currentTime)}</p>
        <input
          min={0}
          max={SongInfo.duration}
          value={SongInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{SongInfo.duration ? getTime(SongInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        {/* Using the ()=> cause i just want to invoke it rather that instanly use it. */}
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>

      {/* Audio has its own event conditions */}
    </div>
  );
};

export default Player;
