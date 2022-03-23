import { NetworkActionTypes } from "../action-types";
import {NetworkStatus, StoreAction} from "../types";

const networkActions = {
  setStatus: (status: NetworkStatus): StoreAction => ({
    type: NetworkActionTypes.UPDATE_NETWORK_STATUS,
    payload: { status }
  }),
  setError: (error: Error): StoreAction => ({
    type: NetworkActionTypes.SET_NETWORK_ERROR,
    payload: error
  })
};

export default networkActions;