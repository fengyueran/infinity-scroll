import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "../../data";
import UseLoaderWithObserver from "./UseLoaderWithObserver";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 681px;
  overflow: auto;
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
  margin: 10px;
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
  const topAnchor = useRef();
  const bottomAnchor = useRef();

  const getReference = (index, isLastIndex) => {
    if (index === 0) return topAnchor;
    if (isLastIndex) return bottomAnchor;
    return null;
  };
  const dataToShow = UseLoaderWithObserver(data, {
    containerRef,
    topAnchor,
    bottomAnchor
  });
  const [visible, setVisible] = useState(false);
  const lastIndex = dataToShow.length - 1;
  return (
    <Container ref={containerRef}>
      {dataToShow.map((item, index) => {
        const refVal = getReference(index, index === lastIndex);
        const id = index === 0 ? "top" : index === lastIndex ? "bottom" : "";
        return (
          <Card key={item.id} ref={refVal} id={id}>
            {item.id}
          </Card>
        );
      })}
    </Container>
  );
}

export default View;
