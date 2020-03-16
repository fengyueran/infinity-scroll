import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "../../data";
import useScrollToLoad from "./useScrollFlexContainer";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: overlay;

  /* transform: ${props => `translateY(${props.transform}px)`}; */
`;

const ListWrapper = styled.div`
  overflow: hidden;
  background: red;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* padding-top: ${props => `${props.padding}px`}; */
`;

const CARD_HEIGHT = 200;
const Card = styled.div`
  width: 250px;
  height: 198px;
  border: 1px solid;
  flex-shrink: 0;
  background: antiquewhite;
`;

const Placeholder = styled.div`
  position: absolute;
  width: 100vw;
  background: red;
  height: ${props => `${props.height}px`};
`;

function List() {
  const containerRef = useRef();
  const cellWidth = 250;
  const cellHeight = 200;

  const { dataToShow, padding, totalRowCount } = useScrollToLoad(
    containerRef,
    data,
    {
      cellWidth,
      cellHeight
    }
  );

  return (
    <Container ref={containerRef}>
      <ListWrapper
        style={{
          height: cellHeight * totalRowCount - padding,
          transform: `translateY(${padding}px)`
        }}
        // padding={padding}
      >
        {dataToShow.map(({ id }) => (
          <Card key={id}>{id}</Card>
        ))}
      </ListWrapper>
    </Container>
  );
}

export default List;
