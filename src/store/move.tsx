import React, { FC, createContext, Dispatch, useReducer } from 'react';

import { MoveState, MoveAction } from './types';

export const MoveContext = createContext({} as [MoveState, Dispatch<MoveAction>]);

function moveReducer(state: MoveState, action: MoveAction): MoveState  {
  const { type, payload } = action;

  switch (type) {
    case 'status': {
      return {...state, status: payload.status};
    }
    case 'moves': {
      return { ...state, moves: [...state.moves, ...payload.moves] }
    }
    case 'error': {
      return { ...state, error: payload.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${type} in ${arguments.callee.name}`);
    }
  }
}

type MoveProviderProps = {
  children: React.ReactNode;
};

const MoveProvider: FC<MoveProviderProps> = (props) => {
  const reducer = useReducer(moveReducer, {
    status: 'idle',
    moves: [],
    error: null
  });

  return <MoveContext.Provider value={reducer} {...props} />
}

export default MoveProvider;
