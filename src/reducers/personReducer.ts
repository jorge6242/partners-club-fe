import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/personTypes";

type InitialState = {
  persons: Array<string | number>;
  loading: boolean;
  secondLoading: boolean;
  assignLoading: boolean;
  relationLoading: boolean;
  selectedPerson: any;
  personsToAssign: any;
  paginationPersonsToAssign: any;
  familyByPerson: Array<string | number>;
};

const initialState: InitialState = {
  persons: [],
  loading: false,
  assignLoading: false,
  relationLoading: false,
  secondLoading: false,
  selectedPerson: null,
  personsToAssign: [],
  paginationPersonsToAssign: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  familyByPerson: [],
};

const personReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        persons: action.payload
      };

    case ACTIONS.GET_PERSON_TO_ASSIGN:
      return {
        ...state,
        personsToAssign: action.payload
      };
    case ACTIONS.SET_PERSON:
      return {
        ...state,
        selectedPerson: action.payload
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTIONS.SET_SECOND_LOADING:
      return {
        ...state,
        secondLoading: action.payload
      };
      case ACTIONS.SET_ASSIGN_LOADING:
        return {
          ...state,
          assignLoading: action.payload
        };
        case ACTIONS.SET_RELATION_LOADING:
          return {
            ...state,
            relationLoading: action.payload
          };
    case ACTIONS.SET_PERSON_ASSIGN_PAGINATION:
      return {
        ...state,
        pagination: action.payload
      };
          case ACTIONS.GET_FAMILY_BY_PERSON:
      return {
        ...state,
        familyByPerson: action.payload
      };
    default:
      return state;
  }
};

export default personReducer;
