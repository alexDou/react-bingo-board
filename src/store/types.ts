export interface MoveState {
  status: 'fulfilled' | 'pending' | 'idle';
  moves: number[];
  error: Error | null
}

export type MoveAction = {
  type: keyof MoveState;
  payload: Partial<{
    [k in keyof MoveState]: MoveState[k];
  }>
}

export type BingoItem = {
  idx: number;
  value: string;
  hit?: true;
}

export interface BingoState {
  cells: BingoItem[];
  players: string[];
  play: this['players'][number];
  winners: this['players'][number][];
  openToWin: number[][];
  draw: boolean;
}

export type BingoAction = {
  type: keyof BingoState;
  payload: Partial<{
    [k in keyof BingoState]: BingoState[k];
  }>
}