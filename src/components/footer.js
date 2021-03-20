import React from "react";
import { Card } from "react-sensei";
import styled from "styled-components";

const BaseSec = () => {
  const Styledcardwrapper = styled.div`
    min-height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7rem 5rem 5rem 5rem;
    z-index: 3;
  `;

  const Title = styled.h4`
    color: gray;
  `;
  return (
    <Styledcardwrapper>
      <Card isDefault>
        <Title>
          This web app is used for experimental purposes only. I am not selling
          these songs. Please find the artists listed and support them! :)
        </Title>
      </Card>
    </Styledcardwrapper>
  );
};

export default BaseSec;
