import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";

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
  const activeLibraryHandler = (nextPrev) => {
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
  const alert = useAlert();

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    } else {
      audioRef.current.volume = 1;
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
    //Forward BAck
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      audioRef.current.loop = false;
      console.log(audioRef.current.loop);
    }
    if (direction === "random") {
      await setCurrentSong(songs[Math.floor(Math.random() * songs.length)]);
      activeLibraryHandler(songs[Math.floor(Math.random() * songs.length)]);
      alert.show("Shuffle enabled.");
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        audioRef.current.loop = false;
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }

    if (direction === "loop") {
      if (currentSong.id === songs[0].id) {
        await setCurrentSong(songs[0]);
        audioRef.current.loop = true;
        console.log(audioRef.current.loop);
        alert.show("Loop enabled.");
      }
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
        <div className="shuffleboi">
          <FontAwesomeIcon
            icon={faRandom}
            size="2x"
            className="random"
            onClick={() => skipTrackHandler("random")}
          ></FontAwesomeIcon>
        </div>
        <div className="backboi">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-back")}
            className="skip-back"
            size="2x"
            icon={faAngleLeft}
          />
        </div>
        {/* Using the ()=> cause i just want to invoke it rather that instanly use it. */}
        <div className="playboi">
          <FontAwesomeIcon
            className="play"
            onClick={playSongHandler}
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
        </div>
        <div className="forwardboi">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-forward")}
            className="skip-forward"
            size="2x"
            icon={faAngleRight}
          />
        </div>
        <div className="loopboi">
          <FontAwesomeIcon
            icon={faRedo}
            className="loop"
            onClick={() => skipTrackHandler("loop")}
            size="2x"
          ></FontAwesomeIcon>
        </div>
      </div>

      {/* Audio has its own event conditions */}
    </div>
  );
};

export default Player;
