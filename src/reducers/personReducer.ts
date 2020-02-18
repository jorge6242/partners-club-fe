import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/personTypes';

type InitialState = {
    persons: Array<string | number>;
    loading: boolean;
}

const initialState: InitialState = {
    persons: [],
    loading: false
};

const personReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                persons: action.payload,
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

export default personReducer;