import {Dispatch} from 'redux';

import {App, NetworkStatus, StoreAction} from "../types";
import {EditActionTypes} from "../action-types";
import networkActions from "./network";
import {apiConfig, http} from "api";
import {RawResponse} from "api/types";

const updateApp = (app: App) => {
  return async (dispatch: Dispatch): Promise<StoreAction> => {
    try {
      dispatch(networkActions.setStatus(NetworkStatus.PENDING));
      const {baseUrl, updateApp: { endpoint, method }} = apiConfig;
      const response: RawResponse = await http[method](`${baseUrl}${endpoint}/${app._id}`, {...app});

      if (response.message !== apiConfig.successMessage || !response.status) {
        throw new Error(response.message);
      }

      return dispatch(networkActions.setStatus(NetworkStatus.IDLE));
    } catch (err) {
      dispatch(networkActions.setStatus(NetworkStatus.ERROR));
      dispatch(networkActions.setError(err));
    }
  }
};

const setEditApp = (app: App): StoreAction => {
    return {
        type: EditActionTypes.SET_EDIT_APP,
        payload: {...app}
    }
};

export default {updateApp, setEditApp};
