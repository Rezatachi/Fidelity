import React from "react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
const Nav = ({ libraryStatus, setlibraryStatus }) => {
  return (
    <nav>
      <Text fontSize="3xl" fontWeight="light">
        Fidelity
        <ColorModeSwitcher />
      </Text>

      <div className="btn">
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => setlibraryStatus(!libraryStatus)}
        >
          <Text fontSize="2xl" fontWeight="light">
            Library
          </Text>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
