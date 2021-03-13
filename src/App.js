import React, { useState } from "react";
import Player from "./components/player";
import Song from "./components/song";
import data from "./util";
import "./styles/app.scss";
//imported libraries

function App() {
  //State
  const [songs, setsongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  return (
    <div>
      <Song currentSong={currentSong} />
      <Player
        setisPlaying={setisPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;
