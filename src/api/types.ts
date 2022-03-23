import {App} from "../store/types";

export type ImplementedReqMethods = "post" | "put";

export type EndpointDef = {
  endpoint: string;
  method: ImplementedReqMethods;
}

export interface APIConfig {
  baseUrl: string;
  fetchApps: EndpointDef;
  updateApp: EndpointDef;
  successMessage: string;
}

export interface RawResponse {
  totalCount: number;
  data: {
    totalCount: number;
    items: App[];
    dau: number;
  };
  message: string;
  status: boolean;
}
