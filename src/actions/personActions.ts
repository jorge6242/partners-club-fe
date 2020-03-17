import Person from "../api/Person";
import snackBarUpdate from "../actions/snackBarActions";
import { updateModal } from "../actions/modalActions";
import { updateModal as updateSecondModal } from "../actions/secondModalActions";
import { ACTIONS } from '../interfaces/actionTypes/personTypes';
import Axios from '../config/Axios';
import headers from "../helpers/headers";

import Prefix from "../config/ApiPrefix";

export const getAll = (page: number = 1, perPage: number = 8) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.getAll(page, perPage);
    let response = [];
    if (status === 200) {
      const pagination = {
        total: data.total,
        perPage: data.per_page,
        prevPageUrl: data.prev_page_url,
        currentPage: data.current_page,
      }
      response = data.data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_PAGINATION,
        payload: pagination
      });
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const search = (term: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.search(term);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
    }
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const searchPersonToAssignFamily = (id: any, term: string = '') => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_SECOND_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.searchPersonToAssignFamily(id, term);
    let response = [];
    if (status === 200) {
      const pagination = {
        total: data.total,
        perPage: data.per_page,
        prevPageUrl: data.prev_page_url,
        currentPage: data.current_page,
      }
      console.log('data ', data);
      response = data.data;
      dispatch({
        type: ACTIONS.GET_PERSON_TO_ASSIGN,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_PERSON_ASSIGN_PAGINATION,
        payload: pagination
      });
    }
    dispatch({
      type: ACTIONS.SET_SECOND_LOADING,
      payload: false
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_SECOND_LOADING,
      payload: false
    });
    return error;
  }
};

export const create = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const response = await Person.create(body);
    const { status, data: { data } } = response;
    let createresponse: any = [];
    if (status === 200 || status === 201) {
      createresponse = { ...data };
      dispatch({
        type: ACTIONS.SET_PERSON,
        payload: data
      });
      snackBarUpdate({
        payload: {
          message: "Persona Creada!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return createresponse;
  } catch (error) {
    let message = 'General Error';
    if (error && error.response) {
      const { data: { message: msg } } = error.response; 
      message = msg
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};


export const createGuest = (body: any, refresh: Function) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const response = await Person.create(body);
    const { status, data: { data } } = response;
    let createresponse: any = [];
    if (status === 200 || status === 201) {
      createresponse = { ...data };
      snackBarUpdate({
        payload: {
          message: "Invitado Registrado",
          type: "success",
          status: true
        }
      })(dispatch);
      await dispatch(getAll());
      refresh(body.rif_ci);
      dispatch(
        updateSecondModal({
          payload: {
            status: false,
            element: null
          }
        })
      );
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return createresponse;
  } catch (error) {
    let message = 'General Error';
    if (error && error.response) {
      const { data: { message: msg } } = error.response; 
      message = msg
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const get = (id: number) => async (dispatch: Function) => {
  dispatch(
    updateModal({
      payload: {
        isLoader: true,
      }
    })
  );
  try {
    const { data: { data }, status } = await Person.get(id);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.SET_PERSON,
        payload: data
      });
    }
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
        }
      })
    );
    return response;
  } catch (error) {
    dispatch(
      updateModal({
        payload: {
          isLoader: false,
        }
      })
    );
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const update = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data, status } = await Person.update(body);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Persona Actualizada!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
      dispatch({
        type: ACTIONS.SET_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const remove = (id: number) => async (dispatch: Function) => {
  try {
    const { data, status } = await Person.remove(id);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      snackBarUpdate({
        payload: {
          message: "Person Elmiminada",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(getAll());
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const removeRelation = (relationId: number, personId: any) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_RELATION_LOADING,
    payload: true
  });
  try {
    const { data, status } = await Person.removeRelation(relationId);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      await dispatch(searchFamilyByPerson(personId));
      snackBarUpdate({
        payload: {
          message: "Relacion Eliminada!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch({
        type: ACTIONS.SET_RELATION_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    dispatch({
      type: ACTIONS.SET_RELATION_LOADING,
      payload: false
    });
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const updateRelation = (body: any) => async (dispatch: Function) => {
  try {
    const { data, status } = await Person.updateRelation(body);
    let response: any = [];
    if (status === 200) {
      response = {
        data,
        status
      };
      await dispatch(searchFamilyByPerson(body.personId));
      snackBarUpdate({
        payload: {
          message: "Relacion Actualizada!",
          type: "success",
          status: true
        }
      })(dispatch);
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        type: "error",
        status: true
      }
    })(dispatch);
    return error;
  }
};

export const geReports = () => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_SECOND_LOADING,
    payload: true
  });
  Axios({
    url: `${Prefix.api}/person-report`,
    method: 'GET',
    responseType: 'blob', // important
    headers: headers(),
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    dispatch({
      type: ACTIONS.SET_SECOND_LOADING,
      payload: false
    });
  });
};

export const getReportsByPartner = (id: any) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_REPORT_BY_PARTNER_LOADING,
    payload: true
  });
  Axios({
    url: `${Prefix.api}/report-by-partner?id=${id}`,
    method: 'GET',
    responseType: 'blob', // important
    headers: headers(),
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'partnerReport.pdf');
    document.body.appendChild(link);
    link.click();
    dispatch({
      type: ACTIONS.SET_REPORT_BY_PARTNER_LOADING,
      payload: false
    });
  }).catch(err => {
    dispatch({
      type: ACTIONS.SET_REPORT_BY_PARTNER_LOADING,
      payload: false
    });
    snackBarUpdate({
      payload: {
        message: 'General Error',
        type: "error",
        status: true
      }
    })(dispatch);
  });
};

export const searchFamilyByPerson = (id: number, term: string = '') => async (dispatch: Function) => {
  try {
    const { data: { data }, status } = await Person.searchFamilyByPerson(id, term);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_FAMILY_BY_PERSON,
        payload: response
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    return error;
  }
};

export const assignPerson = (body: any) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_ASSIGN_LOADING,
    payload: true
  });
  try {
    const response = await Person.assignPerson(body);
    const { status, data: { data } } = response;
    let createresponse: any = [];
    if (status === 200 || status === 201) {
      createresponse = { ...data };
      snackBarUpdate({
        payload: {
          message: "Persona Relacionada!",
          type: "success",
          status: true
        }
      })(dispatch);
      dispatch(searchFamilyByPerson(body.base_id));
      dispatch({
        type: ACTIONS.SET_ASSIGN_LOADING,
        payload: false
      });
    }
    return createresponse;
  } catch (error) {
    let message = 'General Error';
    if (error && error.response) {
      const { data: { message: msg } } = error.response; 
      message = msg
    }
    snackBarUpdate({
      payload: {
        message,
        type: "error",
        status: true
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_ASSIGN_LOADING,
      payload: false
    });
    return error;
  }
};

export const searchPartnersToAssign = (term: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_PARTNERS_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.searchToAssign(term);
    let response = [];
    console.log('data ', data);
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_PARTNERS_TO_ASSIGN,
        payload: response
      });
    }
    dispatch({
      type: ACTIONS.SET_PARTNERS_LOADING,
      payload: false
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_PARTNERS_LOADING,
      payload: false
    });
    return error;
  }
};

export const searchTitularToAssign = (term: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_TITULAR_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.searchToAssign(term);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_TITULAR_TO_ASSIGN,
        payload: response
      });
    }
    dispatch({
      type: ACTIONS.SET_TITULAR_LOADING,
      payload: false
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_TITULAR_LOADING,
      payload: false
    });
    return error;
  }
};

export const getFamiliesPartnerByCard = (card: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING,
    payload: true
  });
  dispatch({
    type: ACTIONS.GET_FAMILIES_PARTNER_BY_CARD,
    payload: {}
  });
  dispatch({
    type: ACTIONS.GET_GUEST_BY_PARTNER,
    payload: {}
  });
  try {
    const { data: { data }, status } = await Person.getFamiliesPartnerByCard(card);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_FAMILIES_PARTNER_BY_CARD,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING,
      payload: false
    });
    return error;
  }
};

export const getGuestByPartner = (identification: string) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_GUEST_BY_PARTNER_LOADING,
    payload: true
  });
  dispatch({
    type: ACTIONS.GET_GUEST_BY_PARTNER,
    payload: {}
  });
  try {
    const { data: { data }, status } = await Person.getGuestByPartner(identification);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_GUEST_BY_PARTNER,
        payload: response
      });
      dispatch({
        type: ACTIONS.SET_GUEST_BY_PARTNER_LOADING,
        payload: false
      });
    }
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_GUEST_BY_PARTNER_LOADING,
      payload: false
    });
    return error;
  }
};

export const clear = () => ({ type: ACTIONS.CLEAR });

export const filter  = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: true
  });
  try {
    const { data: { data }, status } = await Person.filter(body);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
    }
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return response;
  } catch (error) {
    snackBarUpdate({
      payload: {
        message: error.message,
        status: true,
        type: "error"
      }
    })(dispatch);
    dispatch({
      type: ACTIONS.SET_LOADING,
      payload: false
    });
    return error;
  }
};

export const filterReport  = (body: object) => async (dispatch: Function) => {
  dispatch({
    type: ACTIONS.SET_SECOND_LOADING,
    payload: true
  });
  Axios({
    url: `${Prefix.api}/person-filter-report`,
    method: 'GET',
    responseType: 'blob', // important
    params: { ...body },
    headers: headers(),
  }).then((response) => {
    console.log('response ', response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'generalReport.pdf');
    document.body.appendChild(link);
    link.click();
    dispatch({
      type: ACTIONS.SET_SECOND_LOADING,
      payload: false
    });
  });
};

