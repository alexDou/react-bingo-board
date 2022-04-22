import React, { FC } from 'react';

import Start from "./Start";
import BingoGrid from "./BingoGrid";
import useBingo from "hooks/useBingo";

const Game: FC = () => {
  const [bingo] = useBingo();

  return bingo.cells.length === 25 ? <BingoGrid /> : <Start />;
}

export default Game;
