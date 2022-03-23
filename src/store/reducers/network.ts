import {Network, NetworkStatus} from '../types';
import {NetworkActionTypes} from "../action-types";

const initialState: Network =  {
  status: NetworkStatus.LOAD,
  error: undefined
};

export default function networkReducer(
  state: Network = initialState,
  {type, payload}: { type: NetworkActionTypes, payload: Partial<Network> }
  ) {
  switch (type) {
    case NetworkActionTypes.FLUSH_NETWORK_ERROR:
      return {
        ...state,
        status: NetworkStatus.IDLE,
        error: undefined
      };
    case NetworkActionTypes.SET_NETWORK_ERROR:
    case NetworkActionTypes.UPDATE_NETWORK_STATUS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
