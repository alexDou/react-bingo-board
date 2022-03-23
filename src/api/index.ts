import axios, {AxiosInstance} from 'axios';

export { default as apiConfig } from './api.config';

export const http = axios.create({
  timeout: 4000,
  headers: {
    'admix-api-key': '2b7123aa-1a2f-4230-9275-7131d0de3fca'
  }
});
