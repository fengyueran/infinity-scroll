import React, { useState, useRef } from "react";
import styled from "styled-components";
import data from "./data";
import useLoaderWithFrame from "./Loader/useLoaderWithFrame";
import useLoaderWithTimeout from "./Loader/useLoaderWithTimeout";
import UseScrollToLoad from "./Loader/UseScrollToLoad/List";
import UseLoaderWithObserver from "./Loader/UseLoaderWithObserver/view";
import TinyVirtualList from "./Loader/TinyVirtualList/view";

const Container = styled.div``;

const Card = styled.div`
  width: 250px;
  height: 200px;
  margin: 10px;
  background: antiquewhite;
`;
const Button = styled.button``;

function App() {
  const containerRef = useRef();
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <UseScrollToLoad />
    </Container>
  );
}

export default App;
