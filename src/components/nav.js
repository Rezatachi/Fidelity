import React from "react";
import { CleanButton } from "react-sensei";
import { Text } from "@chakra-ui/react";

const Nav = ({ libraryStatus, setlibraryStatus }) => {
  return (
    <nav>
      <Text fontSize="3xl" fontWeight="extrabold">
        Fidelity
      </Text>

      <div className="btn">
        <CleanButton
          style={{ outline: "none", border: "none", cursor: "pointer" }}
          isPrimary
          onClick={() => setlibraryStatus(!libraryStatus)}
        >
          <Text fontSize="lg" fontWeight="extrabold">
            Library
          </Text>
        </CleanButton>
      </div>
    </nav>
  );
};

export default Nav;
