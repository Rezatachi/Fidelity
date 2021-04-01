import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Container,
  CloseButton,
} from "@chakra-ui/react";
import Libsong from "./librarysong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setsongs,
  libraryStatus,
  setlibraryStatus,
}) => {
  return (
    <Container className={`library ${libraryStatus ? "active-lib" : " "}`}>
      <Box
        w="80%"
        bg="teal"
        px="4"
        py="4"
        ml="2rem"
        mt="2rem"
        rounded="md"
        color="white"
        zIndex="5"
      >
        <CloseButton
          onClick={() => setlibraryStatus(!libraryStatus)}
          size="md"
          bg="teal"
        />
        <h1>Library</h1>
        <Stat>
          <StatLabel>Total Songs</StatLabel>
          <StatNumber>{songs.length}</StatNumber>
          <FontAwesomeIcon>{faVolumeUp}</FontAwesomeIcon>
        </Stat>
      </Box>
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
    </Container>
  );
};

export default library;
