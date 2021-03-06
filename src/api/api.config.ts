import { APIConfig } from "./types";

const apiConfig: APIConfig = {
    endpoint: 'https://www.randomnumberapi.com/api/v1.0/random',
    payload: { min:1, max: 25, count: 1 }
} as const;

export default apiConfig;
