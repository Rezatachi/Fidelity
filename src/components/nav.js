import React from "react";
import { CleanButton } from "react-sensei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
const Nav = ({ libraryStatus, setlibraryStatus }) => {
  return (
    <nav>
      <h1>
        Fidelity
        <FontAwesomeIcon
          className="title"
          icon={faHeadphones}
        ></FontAwesomeIcon>
      </h1>

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
