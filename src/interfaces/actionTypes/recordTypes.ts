export const ACTIONS = {
    GET_ALL: 'record/get_all',
    GET_RECORDS_BY_PERSON: 'record/get_records_by_person',
    GET: 'record/get',
    GET_LIST: 'record/get_list',
    SET_LOADING: 'record/set_loading',
    SET_PAGINATION: 'record/set_pagination',
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }

    interface GetRecordsByPerson {
    type: typeof ACTIONS.GET_RECORDS_BY_PERSON
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }

  interface GetList {
    type: typeof ACTIONS.GET_LIST
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }

  interface SetPagination {
    type: typeof ACTIONS.SET_PAGINATION
    payload: Array<string|number>
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList | GetRecordsByPerson;