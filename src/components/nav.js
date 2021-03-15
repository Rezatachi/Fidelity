import React from "react";
import { CleanButton } from "react-sensei";
import styled from "styled-components";

const Nav = ({ libraryStatus, setlibraryStatus }) => {
  return (
    <nav>
      <h1>Fidelity</h1>
      <div className="btn">
        <CleanButton
          style={{ outline: "none", border: "none" }}
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
