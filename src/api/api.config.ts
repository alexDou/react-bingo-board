import { APIConfig } from "./types";

const apiConfig: APIConfig = {
    endpoint: 'https://www.randomnumberapi.com/api/v1.0/random',
    payload: { min:10, max: 24, count: 1 }
} as const;

export default apiConfig;
