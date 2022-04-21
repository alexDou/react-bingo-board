import React, { FC, ReactElement } from "react";

import ErrorBoundaries from 'components/ErrorHandler/ErrorBoundaries';
import MoveProvider from "store/move";
import BingoProvider from "./store/bingo";
import Game from "./components/Game";

const App: FC = (): ReactElement => {
  return (
    <ErrorBoundaries>
      <MoveProvider>
        <BingoProvider>
          <Game />
        </BingoProvider>
      </MoveProvider>
    </ErrorBoundaries>
  );
};

export default App;
