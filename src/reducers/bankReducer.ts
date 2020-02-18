import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/bankTypes';

type BanksInitialState = {
    banks: Array<string | number>;
    loading: boolean;
}

const initialState: BanksInitialState = {
    banks: [],
    loading: false
};

const bankReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                banks: action.payload,
            };
            case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default bankReducer;