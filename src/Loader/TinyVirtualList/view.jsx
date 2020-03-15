import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "../../data";
import VirtualList from "./VirtualList.tsx";
import "./demo.css";

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
  height: 50px;
  border: 1px solid;
  background: antiquewhite;
`;

const Placeholder = styled.div`
  position: absolute;
  width: 100vw;
  background: red;
  height: ${props => `${props.height}px`};
`;

const stickyIndices = [0, 5, 8, 15, 30, 50, 100, 200];
const renderItem = ({ style, index }) => {
  return (
    <Card className="Row" style={style} key={index}>
      Row #{index}
    </Card>
  );
};
function View() {
  // const containerRef = useRef();
  // const placeHolderheight = CARD_HEIGHT;
  // const dataToShow = useScrollToLoad(containerRef, data);
  // const [visible, setVisible] = useState(false);

  return (
    <Container>
      <VirtualList
        width="auto"
        height="100vh"
        itemCount={10000}
        renderItem={renderItem}
        itemSize={50}
        className="VirtualList"
        // stickyIndices={stickyIndices}
      />
    </Container>
  );
}

export default View;
