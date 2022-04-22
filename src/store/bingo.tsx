import React, { FC, createContext, Dispatch, useReducer } from 'react';

import { BingoState, BingoAction } from "./types";

export const BingoContext = createContext({} as [BingoState, Dispatch<BingoAction>]);

function bingoReducer(state, action: BingoAction): BingoState  {
  const { type, payload } = action;

  if (!(type in state) || !payload[type]) {
    console.log(payload, state)
    throw new Error(`Unhandled action type: ${type} in bingoReducer`);
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

export const prefill = `wow
auch
ouch
oops
a-ha
psht
oh
ah
argh
bu-ga-ga
d'oh
psst
o-la-la
karamba
ogo
hm
au-ya
yo-ho-ho
brr
fuff
ha-ha
mech
pew
yay`;

export default BingoProvider;
