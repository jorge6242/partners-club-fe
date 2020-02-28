import {  ACTIONS, ActionTypes } from '../interfaces/actionTypes/personTypes';

type InitialState = {
    persons: Array<string | number>;
    loading: boolean;
    secondLoading: boolean;
    selectedPerson: any;
}

const initialState: InitialState = {
    persons: [],
    loading: false,
    secondLoading: false,
    selectedPerson: null,
};

const personReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.GET_ALL:
            return {
                ...state,
                persons: action.payload,
            };
        case ACTIONS.SET_PERSON:
                return {
                    ...state,
                    selectedPerson: action.payload,
                };
            case ACTIONS.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
            case ACTIONS.SET_SECOND_LOADING:
                return {
                    ...state,
                    secondLoading: action.payload,
                };
        default:
            return state;
    }
};

export default personReducer;