import React, { FC } from 'react';

import Start from "./Start";
import BingoGrid from "./BingoGrid";
import useBingo from "hooks/useBingo";

const Game: FC = () => {
  const [bingo, dispatchBingo] = useBingo();

  return bingo.cells.length === 24 ? <BingoGrid /> : <Start />;
}

export default Game;