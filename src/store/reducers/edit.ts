import {App} from '../types';
import {EditActionTypes} from "../action-types";

const initialState: App =  {
    _id: '',
    title: '',
    tags: [],
    avails: 0,
    score: 0,
    platform: undefined,
    geos: [],
    storeCategories: "",
    updatedAt: '',
    createdAt: ''
};

export default function appsReducer(state: App = initialState, {type, payload}: { type: EditActionTypes, payload: Partial<App> }) {
    switch (type) {
        case EditActionTypes.SET_EDIT_APP:
        case EditActionTypes.MAKE_UPDATE:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};
