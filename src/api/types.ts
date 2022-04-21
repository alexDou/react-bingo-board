export type RandomNumPayload = {
  min: number,
  max: number,
  count: 1
}

export interface APIConfig {
  endpoint: string;
  payload: RandomNumPayload;
}
