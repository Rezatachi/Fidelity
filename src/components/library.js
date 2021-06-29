import React, { useState, useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  Container,
  CloseButton,
  useColorMode,
} from "@chakra-ui/react";
import Libsong from "./librarysong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setsongs,
  libraryStatus,
  setlibraryStatus,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let library = ["library_header"];
  if (scrolled) {
    library.push("scrolled");
  }
  const { colorMode } = useColorMode();
  return (
    <Container className={`library ${libraryStatus ? "active-lib" : " "}`}>
      <Box
        className="library_header"
        w="80%"
        bg={colorMode === "light" ? "#a7b0ca" : "#d5dcf9"}
        px="4"
        py="4"
        ml="2rem"
        mt="2rem"
        rounded="md"
        color={colorMode === "light" ? "white" : "black"}
        zIndex="5"
      >
        <CloseButton
          onClick={() => setlibraryStatus(!libraryStatus)}
          size="md"
          bg={colorMode === "light" ? "#a7b0ca" : "#d5dcf9"}
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

export default Library;
