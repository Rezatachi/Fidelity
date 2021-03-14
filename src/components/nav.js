import React from "react";
import { CleanButton } from "react-sensei";
import styled from "styled-components";

const Nav = ({ libraryStatus, setlibraryStatus, theme }) => {
  const StyledButtonWrapper = styled.div`
    margin-right: 4rem;
    border-radius: 25%;
    font-family: "Montserrat", sans-serif;
    z-index: 10;
  `;
  return (
    <nav>
      <h1>Fidelity</h1>
      <StyledButtonWrapper>
        <CleanButton
          style={{ outline: "none", border: "none", cursor: "pointer" }}
          isPrimary
          classname="lib-btn"
          onClick={() => setlibraryStatus(!libraryStatus)}
        >
          <h1>Library</h1>
        </CleanButton>
      </StyledButtonWrapper>
    </nav>
  );
};

export default Nav;
