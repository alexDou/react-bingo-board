import {Dispatch} from 'redux';

import {http, apiConfig} from 'api';
import {AppsActionTypes} from 'store/action-types';
import {App, NetworkStatus, RequestBody, StoreAction} from "../types";
import {RawResponse} from "api/types";
import networkActions from './network';

const getApps = (reqBody: RequestBody) => {
  return async (dispatch: Dispatch): Promise<StoreAction> => {
    try {
      dispatch(networkActions.setStatus(NetworkStatus.PENDING));
      const {endpoint, method} = apiConfig.fetchApps;
      const response: RawResponse = await http[method](endpoint, {...reqBody});
      const applications = response.data.totalCount !== 0
        ? response.data.items
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
  return (dispatch, getState) => {
    const allApps = getState().apps.applications;
    const rx = new RegExp(search, 'ig');
    const appsSorted = search.length
      ? allApps.filter((app: App) => rx.test(app.title))
      : allApps;

    return {
      type: AppsActionTypes.SET_APPS_SORT,
      payload: { applicationsSort: appsSorted }
    }
  }
};

export default { getApps, searchApps };
