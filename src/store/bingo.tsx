import React, { FC, createContext, Dispatch, useReducer } from 'react';

import { BingoState, BingoAction } from "./types";

export const BingoContext = createContext({} as [BingoState, Dispatch<BingoAction>]);

function bingoReducer(state, action: BingoAction): BingoState  {
  const { type, payload } = action;

  if (!state[type] || !payload[type]) {
    throw new Error(`Unhandled action type: ${type} in ${arguments.callee.name}`);
  }

  return { ...state, ...payload };
}

type BingoProviderProps = {
  children: React.ReactNode;
};

const BingoProvider: FC<BingoProviderProps> = (props) => {
  const reducer = useReducer(bingoReducer, {
    cells: [],
    players: [],
    play: '',
    winners: []
  });

  return <BingoContext.Provider value={reducer} {...props} />;
}

export default BingoProvider;
