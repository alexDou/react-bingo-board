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

export interface BingoState {
  cells: Record<number, string>[];
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