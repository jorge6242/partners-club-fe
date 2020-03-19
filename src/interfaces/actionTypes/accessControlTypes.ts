export const ACTIONS = {
  GET_ALL: "access-control/get_all",
  GET: "access-control/get",
  GET_LIST: "access-control/get_list",
  SET_LOADING: "access-control/set_loading",
  SET_REPORT_LOADING: "access-control/set_report_loading",
  SET_PAGINATION: "access-control/set_pagination"
};

interface Get {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetAll {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface GetList {
  type: typeof ACTIONS.GET_LIST;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetReportLoading {
  type: typeof ACTIONS.SET_REPORT_LOADING;
  payload: boolean;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION;
  payload: Array<string | number>;
}

export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList | SetReportLoading;
