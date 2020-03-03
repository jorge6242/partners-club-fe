export const ACTIONS = {
    GET_ALL: 'person/get_all',
    GET: 'person/get',
    GET_PERSON_TO_ASSIGN: 'person/get_persons_to_assign',
    SET_PERSON: 'set_person/get',
    SET_PERSON_ASSIGN_PAGINATION: 'person/set_person_assign_pagination',
    GET_FAMILY_BY_PERSON: 'person/get_family_by_person',
    SET_LOADING: 'person/set_loading',
    SET_SECOND_LOADING: 'person/set_second_loading',
    SET_RELATION_LOADING: 'person/set_relation_loading',
    SET_ASSIGN_LOADING: 'person/set_assign_loading'
};
  
  interface GetPerson {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }

  interface GetFamilyByPerson {
    type: typeof ACTIONS.GET_FAMILY_BY_PERSON
    payload: Array<string|number>
  }

  interface SetPerson {
    type: typeof ACTIONS.SET_PERSON
    payload: Array<string|number>
  }

  interface SetPersonAssignPagination {
    type: typeof ACTIONS.SET_PERSON_ASSIGN_PAGINATION
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

  interface SetRelationLoading {
    type: typeof ACTIONS.SET_RELATION_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetPerson | GetFamilyByPerson | SetPerson | SetPersonAssignPagination | GetAllPersons | SetLoading | SetSecondLoading | SetRelationLoading