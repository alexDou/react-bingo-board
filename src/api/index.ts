import axios, { AxiosInstance, AxiosResponse } from 'axios';

import apiConfig from './api.config';

const http: AxiosInstance = axios.create({
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json'
  },
  params: apiConfig.payload
});

const sleep = (delayMs: number) => {
  let start = new Date().getTime();
  while (new Date().getTime() < start + delayMs);
}

const makeMove = async (exclude: number[]) => {
  let move: number[] | null = null;
  let i = 0;
  while (!move || exclude.includes(move[0])) {
    if (i >= 1) {
      sleep(500);
    }
    const resp: AxiosResponse<number[]> = await http.get(apiConfig.endpoint);
    move = resp.data;
    i++;
  }

  return move;
}

export default makeMove;
