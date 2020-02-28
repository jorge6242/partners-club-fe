export const ACTIONS = {
    GET_ALL: 'person/get_all',
    GET: 'person/get',
    SET_PERSON: 'set_person/get',
    SET_LOADING: 'person/set_loading',
    SET_SECOND_LOADING: 'person/set_loading'
};
  
  interface GetPerson {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }

  interface SetPerson {
    type: typeof ACTIONS.SET_PERSON
    payload: Array<string|number>
  }
  
  interface GetAllPersons {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }

  interface SetSecondLoading {
    type: typeof ACTIONS.SET_SECOND_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetPerson | SetPerson | GetAllPersons | SetLoading | SetSecondLoading