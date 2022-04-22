export interface MoveState {
  status: string;
  moves: number[];
  error: Error | null
}

export type MoveAction = {
  type: keyof MoveState;
  payload: {
    [k in keyof MoveState]: MoveState[k];
  }
}

export type BingoItem = {
  idx: number;
  value: string;
}

export interface BingoState {
  cells: BingoItem[];
  players: string[];
  play: this['players'][number];
  winners: this['players'][number][];
}

export type BingoAction = {
  type: keyof BingoState;
  payload: {
    [k in keyof BingoState]: BingoState[k];
  }
}