import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

//Imported functions

const Player = ({ currentSong, isPlaying, setisPlaying }) => {
  //Ref
  const audioRef = useRef(null);
  // This is referencing the html tag, go to your html tag and equal it to audioref

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

  //State
  const [SongInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...SongInfo, currentTime: current, duration });
    // This state here states that as you accumulate the current time and the duration, append that to the song Info
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
        <p>{getTime(SongInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        //Basically LoadedMeta Data looks like this when the song information loads into react, it fetches the number instantaneously
      ></audio>
      {/* Audio has its own event conditions */}
    </div>
  );
};

export default Player;
