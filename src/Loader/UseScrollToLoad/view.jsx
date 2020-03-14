import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "../../data";
import useScrollToLoad from "./useScrollToLoad";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: overlay;
`;

const List = styled.div`
  overflow: hidden;
  background: darkgrey;
  position: relative;
`;

const CARD_HEIGHT = 200;
const Card = styled.div`
  width: 250px;
  height: 200px;
  border: 1px solid;
  background: antiquewhite;
`;

const Placeholder = styled.div`
  position: absolute;
  width: 100vw;
  background: red;
  height: ${props => `${props.height}px`};
`;

function View() {
  const containerRef = useRef();
  const placeHolderheight = CARD_HEIGHT;
  const dataToShow = useScrollToLoad(containerRef, data);
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <List ref={containerRef}>
        {dataToShow.map(({ id }) => (
          <Card key={id}>{id}</Card>
        ))}
      </List>
      <Placeholder height={placeHolderheight} />
    </Container>
  );
}

export default View;
