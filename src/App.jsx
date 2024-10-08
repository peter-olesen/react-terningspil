import { Game } from "./components/game/game";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { useState } from "react";
import "./App.scss";

function App() {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
}

export default App;
