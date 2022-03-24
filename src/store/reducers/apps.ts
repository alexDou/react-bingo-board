import {AppsState} from '../types';
import {AppsActionTypes} from "../action-types";

const initialState: AppsState = {
  totalCount: 0,
  applications: [],
  applicationsSort: [],
  request: {
    pageIndex: 0,
    pageSize: 0,
    operator: "and",
    filters: [],
    sorts: []
  },
  reload: false
};

export default function appsReducer(
  state: AppsState = initialState,
  {type, payload}: { type: AppsActionTypes, payload: Partial<AppsState> }
) {
  switch (type) {
    case AppsActionTypes.SET_APPS_PER_PAGE:
    case AppsActionTypes.SET_PAGE_INDEX:
    case AppsActionTypes.SET_FILTER:
      return {
        ...state.applications,
        request: {
          ...state.request,
          ...payload
        }
      };
    case AppsActionTypes.SET_APPS:
    case AppsActionTypes.SET_APPS_SORT:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
