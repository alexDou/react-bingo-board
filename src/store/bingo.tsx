import React, { FC, createContext, Dispatch, useReducer } from 'react';

import { BingoState, BingoAction } from "./types";

export const totalMovesAllowed = 16;

export const BingoContext = createContext({} as [BingoState, Dispatch<BingoAction>]);

function bingoReducer(state, action: BingoAction): BingoState  {
  const { type, payload } = action;

  if (!(type in state) || !(type in payload)) {
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
    winners: [],
    openToWin: [
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
      [16,17,18,19,20],
      [21,22,23,24,25],
      [1,6,11,16,21],
      [2,7,12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24],
      [5,10,15,20,25]
    ],
    draw: false
  });

  return <BingoContext.Provider value={reducer} {...props} />;
}

const draws = [
  [1,7,13,19,25],
  [5,9,13,17,21]
]

export const isWinningOrDraw = (moves: number[], bingo: BingoState, dispatch: Dispatch<BingoAction>) => {
  const movesLen = moves.length;
  if (movesLen < 4) {
    return 'pass';
  }

  // is it a draw
  const drawConfirm = [];
  for (const draw of draws) {
    for (const dn of draw) {
      if (!moves.includes(dn)) {
        drawConfirm.push(false);
        break;
      }
    }
  }
  if (drawConfirm.length < draws.length) {
    dispatch({ type: 'draw', payload: { draw: true }});
    dispatch({ type: 'winners', payload: { winners: [] }});
    return;
  }

  // is it a win
  const winConfirm = Array(bingo.openToWin.length).fill(true);
  let i = -1;
  for (const win of bingo.openToWin) {
    i += 1;
    for (const wn of win) {
      if (!moves.includes(wn)) {
        winConfirm[i] = false;
        break;
      }
    }
  }
  while (winConfirm.includes(true)) {
    const winIdx = winConfirm.findIndex(el => el === true);
    winConfirm[winIdx] = false;
    dispatch({
      type: 'openToWin',
      payload: {
        openToWin: [...bingo.openToWin.slice(0, winIdx), ...bingo.openToWin.slice(winIdx + 1)]
      }
    });
    dispatch({ type: "winners", payload: { winners: [...bingo.winners, bingo.play ] }});
  }
}

export const prefill = `wow
auch
boo
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
mwah
mech
pew
yay`;

export default BingoProvider;
