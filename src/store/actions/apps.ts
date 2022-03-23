import {Dispatch} from 'redux';

import {http, apiConfig} from 'api';
import {AppsActionTypes} from 'store/action-types';
import {NetworkStatus, RequestBody, StoreAction} from "../types";
import {RawResponse} from "api/types";
import networkActions from './network';

const getApps = (reqBody: RequestBody): any => {
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
        payload: {applications, totalCount: response.data.totalCount}
      });
      return dispatch(networkActions.setStatus(NetworkStatus.IDLE));
    } catch (err) {
      dispatch(networkActions.setStatus(NetworkStatus.ERROR));
      dispatch(networkActions.setError(err));
    }
  };
};

export default { getApps };
