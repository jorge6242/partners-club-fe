import AXIOS from "../config/Axios";
import headers from "../helpers/headers";
import Prefix from "../config/ApiPrefix";

const Person = {
  getAll() {
    return AXIOS.get(`${Prefix.api}/person`, { headers: headers() });
  },
  create(data: any) {
    return AXIOS.post(
      `${Prefix.api}/person`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  get(id: number) {
    return AXIOS.get(`${Prefix.api}/person/${id}`, { headers: headers() });
  },
  update(data: any) {
    return AXIOS.put(
      `${Prefix.api}/person/${data.id}`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  remove(id: number) {
    return AXIOS.delete(`${Prefix.api}/person/${id}`, { headers: headers() });
  },
  search(term: string) {
    return AXIOS.get(`${Prefix.api}/person-search?term=${term}`, {
      headers: headers()
    });
  },
  report() {
    return AXIOS.get(`${Prefix.api}/person-report`, { headers: headers() });
  },
  searchPersonToAssign(id: any, term: string) {
    return AXIOS.get(`${Prefix.api}/search-person-to-assign`, {
      params: {
        term,
        id
      },
      headers: headers()
    });
  },
  assignPerson(data: any) {
    return AXIOS.post(
      `${Prefix.api}/assign-person`,
      {
        ...data
      },
      { headers: headers() }
    );
  },
  searchFamilyByPerson(id: number, term: string) {
    return AXIOS.get(`${Prefix.api}/search-family-by-person`, {
      params: {
        term,
        id
      },
      headers: headers()
    });
  },
  updateRelation(data: any) {
    return AXIOS.put(
      `${Prefix.api}/person-relation/${data.id}`,
      { ...data },
      { headers: headers() }
    );
  },
  removeRelation(id: number) {
    return AXIOS.delete(`${Prefix.api}/person-relation/${id}`, {
      headers: headers()
    });
  }
};

export default Person;
