import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';

import './index.sass';
import { getAll, remove, search } from "../../actions/userActions";
import { updateModal } from "../../actions/modalActions";
import UserForm from "../../components/UserForm";
import DataTable from '../../components/DataTable'
import UserColumns from '../../interfaces/UserColumns';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: UserColumns[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "name",
    label: "Nombre",
    minWidth: 170,
    align: "right"
  },
  {
    id: "email",
    label: "Correo",
    minWidth: 170,
    align: "right"
  },
];

export default function User() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    async function fetchData() {
      dispatch(getAll());
    }
    fetchData();
  }, [dispatch]);

  const handleEdit = (id: number) => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <UserForm id={id} />,
          customSize: 'medium',
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <UserForm />,
          customSize: 'medium',
        }
      })
    );
  }

  const handleDelete = (id: number) => {
    dispatch(remove(id));
  };

  const handleSearch = (event: any) => {
    if (event.value.trim() === '') {
      dispatch(getAll())
    } else {
      dispatch(search(event.value))
    }
  }

  return (
    <div className="gender-container">
      <div className="gender-container__header">
        <div className="gender-container__title">Usuarios</div>
        <div className="gender-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="gender-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable
          data={list}
          columns={columns}
          handleEdit={handleEdit}
          isDelete
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}
