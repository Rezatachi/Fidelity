import React, { useState, useRef, useEffect } from "react";
import Player from "./components/player";
import Song from "./components/song";
import chillhop from "./data";
import Nav from "./components/nav";
import Library from "./components/library";
import BaseSec from "./components/footer";
import "./styles/app.scss";
//imported libraries
import { SenseiProvider, themeDark, themeLightBlue } from "react-sensei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
function App() {
  const audioRef = useRef(0);
  //State
  const [themeset, setthemeset] = useState("light");
  const toggleTheme = () => {
    if (themeset === "dark") {
      localStorage.setItem("theme", "light");
      setthemeset("light");
    } else {
      localStorage.setItem("theme", "dark");
      setthemeset("dark");
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setthemeset(localTheme);
    }
  }, []);

  const [volume, setvolume] = useState(0.3);
  const [songs, setsongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [SongInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setlibraryStatus] = useState();
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
    <SenseiProvider theme={themeset === "dark" ? themeLightBlue : themeDark}>
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav
          libraryStatus={libraryStatus}
          setlibraryStatus={setlibraryStatus}
          themeset={themeset}
          setthemeset={themeset}
        />

        <div>
          <Song currentSong={currentSong} isPlaying={isPlaying} />
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
            volume={volume}
            setvolume={setvolume}
          />{" "}
          <div className="theme-container">
            <button className="themer" onClick={toggleTheme}>
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
            </button>
          </div>
          <BaseSec />
          <Library
            theme={themeset === "dark" ? themeLightBlue : themeDark}
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
