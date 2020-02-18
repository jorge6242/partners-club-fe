export const ACTIONS = {
    GET_ALL: 'bank/get_all',
    GET: 'bank/get',
    SET_LOADING: 'bank/set_loading'
};
  
  interface GetBank {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }
  
  interface GetAllBanks {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }
  
  
  export type ActionTypes = GetBank | GetAllBanks | SetLoading