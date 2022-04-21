import axios, { AxiosInstance, AxiosResponse } from 'axios';

import apiConfig from './api.config';

const http: AxiosInstance = axios.create({
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json'
  },
  params: apiConfig.payload
});

const makeMove = async (exclude: number[]) => {
  let move: number[] | null = null;
  while (!move|| exclude.includes(move[0])) {
    const resp: AxiosResponse<number[]> = await http.get(apiConfig.endpoint);
    move = resp.data;
  }

  return move;
}

export default makeMove;
