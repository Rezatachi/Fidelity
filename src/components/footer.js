import React from "react";

import { Box, Text } from "@chakra-ui/layout";
import styled from "styled-components";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BaseSec = () => {
  const Styledcardwrapper = styled.div`
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7rem 5rem 5rem 5rem;
    z-index: 3;
  `;

  return (
    <Styledcardwrapper>
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          Follow me on Spotify:
          <a href="https://open.spotify.com/artist/2jTi8cbTG80MsEtUCOuGa3">
            <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>code
          </a>
        </Text>
      </Box>
    </Styledcardwrapper>
  );
};

export default BaseSec;
