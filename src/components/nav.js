import React from "react";
import { CleanButton } from "react-sensei";
import { Text } from "@chakra-ui/react";
const Nav = ({ libraryStatus, setlibraryStatus }) => {
  return (
    <nav>
      <Text
        bgGradient="linear(to-l, gray,#008080)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="extrabold"
      >
        Fidelity
      </Text>

      <div className="btn">
        <CleanButton
          style={{ outline: "none", border: "none", cursor: "pointer" }}
          isPrimary
          onClick={() => setlibraryStatus(!libraryStatus)}
        >
          <h1>Library</h1>
        </CleanButton>
      </div>
    </nav>
  );
};

export default Nav;
