import React from "react";
import { Card, StatIconCard } from "react-sensei";
import Libsong from "./librarysong";
import styled from "styled-components";

const library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setsongs,
  libraryStatus,
}) => {
  const StyledButtonWrapper2 = styled.div`
    width: 20rem;
  `;
  return (
    <Card className={`library ${libraryStatus ? "active-lib" : " "}`}>
      <h2>Library</h2>
      <StyledButtonWrapper2>
        <StatIconCard label="Total Lo-Fi Songs" value="16" icon="volume-up" />
      </StyledButtonWrapper2>
      <div className="library-songs">
        {songs.map((song) => (
          <Libsong
            setsongs={setsongs}
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
            id={song.id}
            key={song.id}
            isPlaying={isPlaying}
            audioRef={audioRef}
            //We passed down all our songs, the states, the ID of the song from util.js and we passed down a key because React requires a key
          />
        ))}
        {/* Here you are mapping the song prop across the Libsong component(during this you are also changing the prop name to song for Libsong) */}
      </div>
    </Card>
  );
};

export default library;
