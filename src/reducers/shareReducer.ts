import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/shareTypes';

type BanksInitialState = {
    list: Array<string | number>;
    loading: boolean;
    pagination: any;
    selectedShare: any;
}

const initialState: BanksInitialState = {
    list: [],
    loading: false,
    pagination: {
        total: 0,
        perPage: 0,
        prevPageUrl: null,
        currentPage: 0,
    },
    selectedShare: {},
};

const shareReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                list: action.payload,
            };
            case ACTIONS.SET_PAGINATION:
                return {
                    ...state,
                    pagination: action.payload,
                };
            case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
            case ACTIONS.SET_SELECTED_SHARE:
                return {
                    ...state,
                    selectedShare: action.payload,
                };
        default:
            return state;
    }
};

export default shareReducer;