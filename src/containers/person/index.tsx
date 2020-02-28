import React, { useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from 'react-redux';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import './index.sass';
import { getAll, remove, search, geReports } from "../../actions/personActions";
import { updateModal } from "../../actions/modalActions";
import PersonForm from "../../components/PersonForm";
import DataTable from '../../components/DataTable'
import PersonColumn from '../../interfaces/PersonColumn';
import CustomSearch from '../../components/FormElements/CustomSearch';

const columns: PersonColumn[] = [
  { id: "id", label: "Id", minWidth: 170 },
  {
    id: "name",
    label: "Nombre",
    minWidth: 170,
    align: "right"
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 170,
    align: "right"
  },
  {
    id: "primary_email",
    label: "Correo Primario",
    minWidth: 170,
    align: "right"
  },
  {
    id: "rif_ci",
    label: "RIF/CI",
    minWidth: 170,
    align: "right"
  },
];

export default function Bank() {
  const dispatch = useDispatch();
  const { persons, loading } = useSelector((state: any) => state.personReducer);
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
          element: <PersonForm id={id} />,
          customSize: 'large'
        }
      })
    );
  };

  const handleCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <PersonForm />,
          customSize: 'large'
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

  const handleReport = () => {
    dispatch(geReports());
  }

  return (
    <div className="person-container">
      <div className="person-container__header">
        <div className="person-container__title">Socio</div>
        <div className="person-container__button" onClick={() => handleReport()}>
          <Fab size="small" color="primary" aria-label="add">
            <PictureAsPdfIcon />
          </Fab>
        </div>
        <div className="person-container__button" onClick={() => handleCreate()}>
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="person-container__search">
        <CustomSearch handleSearch={handleSearch} />
      </div>
      <div>
        <DataTable
          data={persons}
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
