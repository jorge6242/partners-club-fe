export const ACTIONS = {
    GET_ALL: 'share/get_all',
    GET: 'share/get',
    SET_LOADING: 'share/set_loading',
    SET_PAGINATION: 'share/set_pagination',
    SET_SELECTED_SHARE: 'share/set_selected_share',
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
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

  interface SetSelectedShare {
    type: typeof ACTIONS.SET_SELECTED_SHARE
    payload: Array<string|number>
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | SetPagination | SetSelectedShare