import { APIConfig } from "./types";

const apiConfig: APIConfig = {
    // baseUrl: 'https://services.admixplay.com/challenge-v1', // real URL
    baseUrl: 'http://localhost:3030', // mock URL
    fetchApps: {
        endpoint: '/fetch',
        method: 'post'
    },
    updateApp: {
        endpoint: '/update',
        method: 'put'
    },
    successMessage: 'Done Successfully!'
} as const;

export default apiConfig;
