import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/personTypes";

type InitialState = {
  persons: Array<string | number>;
  partnersToAssign: Array<string | number>;
  familiesPartnerByCard: Array<string | number>;
  guestByPartner: object;
  titularToAssign: Array<string | number>;
  loading: boolean;
  secondLoading: boolean;
  assignLoading: boolean;
  setPartnersLoading: boolean;
  setTitularLoading: boolean;
  relationLoading: boolean;
  reportByPartnerLoading: boolean;
  selectedPerson: any;
  personsToAssign: any;
  paginationPersonsToAssign: any;
  familiesPartnerCardLoading: boolean;
  guestByPartnerLoading: boolean;
  familyByPerson: Array<string | number>;
  pagination: any;
};

const initialState: InitialState = {
  persons: [],
  loading: false,
  assignLoading: false,
  relationLoading: false,
  reportByPartnerLoading: false,
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
  partnersToAssign: [],
  titularToAssign: [],
  setPartnersLoading: false,
  setTitularLoading: false,
  familiesPartnerByCard: [],
  familiesPartnerCardLoading: false,
  guestByPartner: {},
  guestByPartnerLoading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0,
}
};

const personReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        persons: action.payload
      };
      case ACTIONS.SET_PAGINATION:
        return {
            ...state,
            pagination: action.payload,
        };
    case ACTIONS.GET_GUEST_BY_PARTNER:
      return {
        ...state,
        guestByPartner: action.payload
      };

    case ACTIONS.GET_PERSON_TO_ASSIGN:
      return {
        ...state,
        personsToAssign: action.payload
      };

    case ACTIONS.GET_FAMILIES_PARTNER_BY_CARD:
      return {
        ...state,
        familiesPartnerByCard: action.payload
      };

    case ACTIONS.GET_PARTNERS_TO_ASSIGN:
      return {
        ...state,
        partnersToAssign: action.payload
      };
    case ACTIONS.GET_TITULAR_TO_ASSIGN:
      return {
        ...state,
        titularToAssign: action.payload
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
    case ACTIONS.SET_REPORT_BY_PARTNER_LOADING:
      return {
        ...state,
        reportByPartnerLoading: action.payload
      };
    case ACTIONS.SET_RELATION_LOADING:
      return {
        ...state,
        relationLoading: action.payload
      };
    case ACTIONS.SET_PARTNERS_LOADING:
      return {
        ...state,
        setPartnersLoading: action.payload
      };
    case ACTIONS.SET_TITULAR_LOADING:
      return {
        ...state,
        setTitularLoading: action.payload
      };
    case ACTIONS.SET_GUEST_BY_PARTNER_LOADING:
      return {
        ...state,
        guestByPartnerLoading: action.payload
      };
    case ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING:
      return {
        ...state,
        familiesPartnerCardLoading: action.payload
      };
    case ACTIONS.SET_PERSON_ASSIGN_PAGINATION:
      return {
        ...state,
        paginationPersonsToAssign: action.payload
      };
    case ACTIONS.GET_FAMILY_BY_PERSON:
      return {
        ...state,
        familyByPerson: action.payload
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        familiesPartnerByCard: initialState.familiesPartnerByCard
      };
    default:
      return state;
  }
};

export default personReducer;
