export interface RequestBody {
  pageIndex: number;
  pageSize: number;
  operator: "and" | "or";
  filters: Filter[];
  sorts: Sort[];
}

export interface Filter {
  name: keyof App;
  value: App[keyof App] | Array<App[keyof App]>;
  operator: "gt" | "lt" | "eq" | "like" | "in";
}

export interface Sort {
  field: keyof App;
  desc: boolean;
}

export interface App {
  _id: string;
  title: string;
  tags: string[];
  avails: number;
  score: number;
  platform: undefined | "mobile" | "vr" | "ar";
  geos: string[];
  storeCategories: string;
  updatedAt: string;
  createdAt: string
}

export const enum NetworkStatus {
  "LOAD" = "LOAD",
  "IDLE" = "IDLE",
  "PENDING" = "PENDING",
  "ERROR" = "ERROR"
}

export interface Network {
  status: NetworkStatus,
  error: undefined | Error;
}

export type AppsState = {
  totalCount: number;
  applications: App[];
  applicationsSort: App[];
  request: RequestBody;
  reload: boolean;
};

export interface StoreAction {
  type: string;
  payload?: any;
}
