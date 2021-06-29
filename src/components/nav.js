import React from "react";
import { Button } from "@chakra-ui/react";
import { Text, useColorMode } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
const Nav = ({ libraryStatus, setlibraryStatus }) => {
  const { colorMode } = useColorMode();
  return (
    <nav>
      <Text fontSize="3xl" fontWeight="light">
        Fidelity
        <ColorModeSwitcher />
      </Text>

      <div className="btn">
        <Button
          bg={colorMode === "light" ? "#a7b0ca" : "#d5dcf9"}
          size="lg"
          color={colorMode === "light" ? "white" : "black"}
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
