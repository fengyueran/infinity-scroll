import React, { useState } from "react";
import styled from "styled-components";
import data from "./data";
import useLoaderWithFrame from "./Loader/useLoaderWithFrame";
import useLoaderWithTimeout from "./Loader/useLoaderWithTimeout";

const Card = styled.div`
  width: 250px;
  height: 200px;
  margin: 10px;
  background: antiquewhite;
`;
const Button = styled.button``;

function App() {
  // const dataToShow = useLoaderWithTimeout(data);
  const dataToShow = useLoaderWithFrame(data);

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(!visible)}>显示</Button>
      {visible && dataToShow.map(({ id }) => <Card key={id}>{id}</Card>)}
    </div>
  );
}

export default App;
