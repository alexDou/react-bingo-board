import {Dispatch} from 'redux';

import {http, apiConfig} from 'api';
import {AppsActionTypes} from 'store/action-types';
import {App, NetworkStatus, RequestBody, StoreAction} from "../types";
import {RawResponse} from "api/types";
import networkActions from './network';
import store from "store";

const getApps = (reqBody: RequestBody) => {
  return async (dispatch: Dispatch): Promise<StoreAction> => {
    try {
      dispatch(networkActions.setStatus(NetworkStatus.PENDING));
      const {baseUrl, fetchApps: { endpoint, method }} = apiConfig;
      const response: { data: RawResponse } = await http[method](`${baseUrl}${endpoint}`, {...reqBody});
      console.log(response)
      const applications = response.data.data.totalCount !== 0
        ? response.data.data.items
        : [];

      dispatch({
        type: AppsActionTypes.SET_APPS,
        payload: {
          applications,
          applicationsSort: applications,
          totalCount: response.data.totalCount
        }
      });
      return dispatch(networkActions.setStatus(NetworkStatus.IDLE));
    } catch (err) {
      dispatch(networkActions.setStatus(NetworkStatus.ERROR));
      dispatch(networkActions.setError(err));
    }
  };
};

const searchApps = (search: string) => {
  const allApps = store.getState().apps.applications;
  let appsSorted = [];
  if (search.length >= 3) {
    appsSorted = allApps.filter(
      (app: App) => app.title.toLowerCase().includes(search.toLowerCase())
    )
  } else {
    appsSorted = allApps;
  }

  return {
    type: AppsActionTypes.SET_APPS_SORT,
    payload: { applicationsSort: appsSorted }
  }
};

export default { getApps, searchApps };
