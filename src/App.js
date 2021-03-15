import React, { useState, useRef } from "react";
import Player from "./components/player";
import Song from "./components/song";
import chillhop from "./data";
import Nav from "./components/nav";
import Library from "./components/library";
import BaseSec from "./components/footer";
import "./styles/app.scss";
//imported libraries
import { SenseiProvider, themeDarkRoseGold as theme } from "react-sensei";

function App() {
  const audioRef = useRef(0);
  //State
  const [songs, setsongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [SongInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setlibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...SongInfo, currentTime: current, duration });
    // This state here states that as you accumulate the current time and the duration, append that to the song Info
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    return;
  };
  return (
    <SenseiProvider theme={theme}>
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav
          theme={theme}
          libraryStatus={libraryStatus}
          setlibraryStatus={setlibraryStatus}
        />
        <div>
          <Song currentSong={currentSong} />
          <Player
            setsongs={setsongs}
            songs={songs}
            SongInfo={SongInfo}
            setSongInfo={setSongInfo}
            audioRef={audioRef}
            setisPlaying={setisPlaying}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
          />
          <BaseSec />
          <Library
            libraryStatus={libraryStatus}
            setsongs={setsongs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            songs={songs}
            setCurrentSong={setCurrentSong}
          />
        </div>
        <audio
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndHandler}
          //Basically LoadedMeta Data looks like this when the song information loads into react, it fetches the number instantaneously
        ></audio>
      </div>
    </SenseiProvider>
  );
}

export default App;
