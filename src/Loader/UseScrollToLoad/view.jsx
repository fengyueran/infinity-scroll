import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "../../data";
import useScrollToLoad from "./useScrollToLoad";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: overlay;

  /* transform: ${props => `translateY(${props.transform}px)`}; */
`;

const List = styled.div`
  overflow: hidden;
  background: darkgrey;
  position: relative;
  padding-top: ${props => `${props.padding}px`};
`;

const CARD_HEIGHT = 200;
const Card = styled.div`
  width: 250px;
  height: 198px;
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
  const startIndex = useScrollToLoad(containerRef, data);
  const countInScreen = 10;
  const dataToShow = data.slice(startIndex, startIndex + countInScreen);
  const padding = startIndex * 200;
  const [visible, setVisible] = useState(false);
  const transform = containerRef.current
    ? containerRef.current.scrollTop -
      (containerRef.current.scrollTop % CARD_HEIGHT)
    : 0;

  return (
    <Container ref={containerRef}>
      <List style={{ height: 200 * 10000 - padding }} padding={padding}>
        {dataToShow.map(({ id }) => (
          <Card key={id}>{id}</Card>
        ))}
      </List>
      {/* <Placeholder height={placeHolderheight} /> */}
    </Container>
  );
}

export default View;
