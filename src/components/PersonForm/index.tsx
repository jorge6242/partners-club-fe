import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Theme,
  useTheme,
  withStyles
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PrintIcon from "@material-ui/icons/Print";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import _ from "lodash";

import CustomSelect from "../FormElements/CustomSelect";
import CustomTextField from "../FormElements/CustomTextField";
import {
  update,
  create,
  get,
  searchPersonsToAssign,
  searchFamilyByPerson,
  assignPerson,
  removeRelation,
  getReportsByPartner,
  updateRelation
} from "../../actions/personActions";
import { getAll as getProfessions } from "../../actions/professionActions";

import {
  getAll as getCardPerson,
  remove as removeCardPerson
} from "../../actions/cardPersonActions";
import {
  create as createShare,
  getSharesByPartner,
  get as getShare,
  update as updateShare
} from "../../actions/shareActions";
import { updateModal } from "../../actions/secondModalActions";
import TransferList from "../TransferList";
import DataTableAssignPersons from "../DataTableAssignPersons";
import PersonColumn from "../../interfaces/PersonColumn";
import CardPersonColumns from "../../interfaces/CardPersonColumns";
import FamilyPersonColumns from "../../interfaces/FamilyPersonColumns";
import DataTable2 from "../DataTable2";
import DataTable3 from "../DataTable3";
import CustomSearch from "../FormElements/CustomSearch";
import LoadingButton from "../FormElements/LoadingButton";
import CardPersonForm from "../CardPersonForm";

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)"
  }
})(MuiExpansionPanelSummary);
const cardPersonColumns: CardPersonColumns[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 5,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "titular",
    label: "Titular",
    minWidth: 20,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "ci",
    label: "Cedula",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "card_number",
    label: "Numero",
    minWidth: 20,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "sec_code",
    label: "CVC",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "expiration_date",
    label: "Vence",
    minWidth: 30,
    align: "left",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "card",
    label: "Tipo",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "bank",
    label: "Banco",
    minWidth: 10,
    align: "left",
    component: (value: any) => <span>{value.value.description}</span>
  },
  {
    id: "orderDetail",
    label: "Orden",
    minWidth: 10,
    align: "left",
    component: (value: any) => (
      <Chip
        label={value.value}
        style={{
          fontSize: "10px"
        }}
        size="small"
        color="primary"
      />
    )
  }
];

const FamilysColumns: FamilyPersonColumns[] = [
  {
    id: "id",
    label: "ID",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "name",
    label: "Nombre",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "last_name",
    label: "Apellido",
    minWidth: 30,
    align: "right",
    component: (value: any) => <span>{value.value}</span>
  },
  {
    id: "relationType",
    label: "Parentesco",
    minWidth: 30,
    align: "right",
    component: (value: any) => (
      <span>
        <strong>{value.value.description}</strong>
      </span>
    )
  },
  {
    id: "status",
    label: "",
    minWidth: 30,
    align: "right",
    component: (value: any) => (
      <Chip
        label={value.value === "1" ? "Activo" : "Inactivo"}
        style={{
          backgroundColor: value.value === "1" ? "#2ecc71" : "#e74c3c",
          color: "white",
          fontWeight: "bold",
          fontSize: "10px"
        }}
        size="small"
      />
    )
  }
];

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
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    textAlign: "center"
  },
  actionButtonContainer: {
    margin: theme.spacing(1),
    position: "relative",
    textAlign: "right"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "10%"
  },
  select: {
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  pictureContainer: {
    maxWidth: 185
  },
  media: {
    height: 200
  },
  formContainer: {
    maxWidth: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  swipeableViewsContainer: {
    height: "350px"
  },
  reportButtonContainer: {},
  profileName: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#3f51b5",
    fontSize: "20px"
  },
  cardPersonButtonContainer: {
    textAlign: "right"
  },
  cardPersonButton: {
    width: "15%",
    fontSize: "12px"
  },
  parsedPersonContainer: {
    fontSize: "12px"
  },
  parsedPersonContainerDetail: {
    textAlign: "left",
    padding: "4px"
  }
}));

type FormData = {
  name: string;
  last_name: string;
  rif_ci: string;
  primary_email: string;
  secondary_email: string;
  passport: string;
  card_number: string;
  birth_date: Date;
  expiration_date: Date;
  gender_id: number;
  representante: string;
  picture: string;
  id_card_picture: string;
  address: string;
  telephone1: string;
  telephone2: string;
  phone_mobile1: string;
  phone_mobile2: string;
  fax: string;
  city: string;
  state: string;
  type_person: number;
  postal_code: string;
  status_person_id: number;
  marital_statuses_id: number;
  countries_id: number;
  profession_list: any;
  share_list: number;
  person: string;
  payment_method_id: number;
  card_people1: number;
  card_people2: number;
  card_people3: number;
};

type PersonFormProps = {
  id?: number;
};

function getParsePerson(data: any, classes: any) {
  const {
    name,
    last_name,
    telephone1,
    rif_ci,
    address,
    primary_email,
    type_person
  } = data;
  return (
    <Grid container spacing={1} className={classes.parsedPersonContainer}>
      <Grid item xs={3} className={classes.parsedPersonContainerTitle}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Tipo Persona:</strong>
          {type_person === 1 ? "Natural" : "Empresa"}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          <strong>Nombre:</strong> {name} {last_name}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          
          <strong>Cedula:</strong> {rif_ci}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          
          <strong>Direccion:</strong> {address}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          
          <strong>Telefono:</strong> {telephone1}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.parsedPersonContainerDetail}>
          
          <strong>Correo:</strong> {primary_email}
        </Paper>
      </Grid>
    </Grid>
  );
}

const PersonForm: FunctionComponent<PersonFormProps> = ({ id }) => {
  /* States */
  const [tempPersonId, setTempPersonId] = useState(0);
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageField, setImageField] = useState();
  const [tabValue, setTabValue] = useState(0);
  const [selectedProff, setSelectedProff] = useState<any>(null);

  /* Form */

  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues
  } = useForm<FormData>();
  const { picture, name, last_name } = getValues();

  /* Redux */
  const dispatch = useDispatch();
  const {
    loading,
    assignLoading,
    relationLoading,
    reportByPartnerLoading,
    personsToAssign,
    paginationPersonsToAssign,
    familyByPerson
  } = useSelector((state: any) => state.personReducer);
  const { list: statusPersonList } = useSelector(
    (state: any) => state.statusPersonReducer
  );
  const { list: maritalStatusList } = useSelector(
    (state: any) => state.maritalStatusReducer
  );
  const { countries } = useSelector((state: any) => state.countryReducer);
  const { list: genderList } = useSelector((state: any) => state.genderReducer);
  const { professions: professionList } = useSelector(
    (state: any) => state.professionReducer
  );
  const { list: relationTypeList } = useSelector(
    (state: any) => state.relationTypeReducer
  );
  const {
    loading: shareLoading,
    list: getShareList,
    selectedShare
  } = useSelector((state: any) => state.shareReducer);
  const { loading: cardPersonLoading, list: cardPersonList } = useSelector(
    (state: any) => state.cardPersonReducer
  );
  const { list: paymentMethodList } = useSelector(
    (state: any) => state.paymentMethodReducer
  );

  const disableTabs = tempPersonId > 0 ? false : true;

  /* Styles */

  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<{}>, tabValue: number) => {
    setTabValue(tabValue);
  };

  const handleChangeIndex = (index: number) => {
    setTabValue(index);
  };

  const handleExpandedPanel = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setSelectedProff([]);
    async function fetch() {
      dispatch(getProfessions());
      if (id) {
        Promise.all([
          dispatch(getSharesByPartner(id)),
          dispatch(searchPersonsToAssign(id)),
          dispatch(searchFamilyByPerson(id)),
          dispatch(getCardPerson(id))
        ]);
        const response: any = await dispatch(get(id));
        const {
          name,
          last_name,
          rif_ci,
          primary_email,
          secondary_email,
          passport,
          card_number,
          birth_date,
          expiration_date,
          gender_id,
          representante,
          picture,
          id_card_picture,
          address,
          telephone1,
          telephone2,
          phone_mobile1,
          phone_mobile2,
          fax,
          city,
          state,
          type_person,
          postal_code,
          status_person_id,
          marital_statuses_id,
          countries_id,
          professions
        } = response;
        setValue("name", name);
        setValue("last_name", last_name);
        setValue("rif_ci", rif_ci);
        setValue("primary_email", primary_email);
        setValue("secondary_email", secondary_email);
        setValue("passport", passport);
        setValue("card_number", card_number);
        setValue("birth_date", birth_date);
        setValue("expiration_date", expiration_date);
        setValue("gender_id", gender_id);
        setValue("representante", representante);
        setValue("picture", picture);
        setValue("id_card_picture", id_card_picture);
        setValue("address", address);
        setValue("telephone1", telephone1);
        setValue("telephone2", telephone2);
        setValue("phone_mobile1", phone_mobile1);
        setValue("phone_mobile2", phone_mobile2);
        setValue("fax", fax);
        setValue("city", city);
        setValue("state", state);
        setValue("postal_code", postal_code);
        setValue("type_person", type_person);
        setValue("status_person_id", status_person_id);
        setValue("marital_statuses_id", marital_statuses_id);
        setValue("countries_id", countries_id);
        if (professions) {
          const list = professions.map((element: any) => element.id);
          setValue("profession_list", JSON.stringify(list));
          setSelectedProff(professions);
        } else {
          setSelectedProff([]);
        }
        setTempPersonId(id);
      }
    }
    fetch();
  }, [id, dispatch, setValue]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = async (form: object) => {
    if (tempPersonId > 0) {
      dispatch(update({ id: tempPersonId, ...form, }));
    } else {
      const response: any = await dispatch(
        create({ ...form, id_card_picture: "ssssss" })
      );
      setTempPersonId(response.id);
    }
  };

  const triggerClick = (input: any) => {
    if (input) {
      setImageField(input);
    }
  };

  const handleImage = () => {
    imageField.click();
    setImageField(imageField);
  };

  const loadImage = (e: any) => {
    const ObjecUrlImage = window.URL.createObjectURL(e.target.files[0]);
    setImage({
      preview: ObjecUrlImage,
      raw: e.target.files[0]
    });
    const reader: any = new FileReader();
    reader.onload = () => {
      setValue("picture", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onProfessionsChange = (event: any) => {
    setValue("profession_list", JSON.stringify(event));
  };

  const handleAssign = async (personRelated: number, relationType: number) => {
    const data = {
      base_id: id,
      related_id: personRelated,
      relation_type_id: relationType,
      status: 1
    };
    await dispatch(assignPerson(data));
    setExpanded("panel-familiars");
  };

  const handleChangePage = (newPage: number) => {
    // const page = pagination.currentPage === 1 ? 2 : newPage;
    // dispatch(getAll(page, pagination.perPage))
  };

  const handlePerPage = (page: number, perPage: number) => {
    // dispatch(getAll(page, perPage))
  };

  const handleSearch = (event: any) => {
    dispatch(searchPersonsToAssign(id, event.value));
  };

  const handleDeleteRelation = (relationId: number) => {
    dispatch(removeRelation(relationId, id));
  };

  const handleSwitchRelation = (relationId: number, relationStatus: string) => {
    const status = relationStatus === "1" ? "0" : "1";
    const data = {
      id: relationId,
      personId: id,
      status
    };
    dispatch(updateRelation(data));
  };

  const handleReportByPartner = () => {
    dispatch(getReportsByPartner(id));
  };

  const handleShare = () => {
    // const {  } = getValues();
    const data = {
      father_action_number: 12345,
      people_id: 1
    };
    dispatch(createShare(data));
  };

  const handleCardPersonCreate = () => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: <CardPersonForm personId={id} share={selectedShare} />
        }
      })
    );
  };

  const handleCardPersonEdit = (row: any) => {
    dispatch(
      updateModal({
        payload: {
          status: true,
          element: (
            <CardPersonForm
              personId={id}
              id={row.id}
              share={selectedShare}
            />
          )
        }
      })
    );
  };

  const handleCardPersonDelete = (row: any) => {
    dispatch(removeCardPerson(row.id, id, selectedShare.id, row.order));
  };

  const handleShareSelect = (event: any) => {
    dispatch(getShare(event.target.value));
  };

  const renderMainData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomSelect
            label="Tipo"
            selectionMessage="Seleccione Tipo"
            field="type_person"
            register={register}
            errorsMessageField={
              errors.type_person && errors.type_person.message
            }
          >
            <option value={1}> Natural </option>
            <option value={2}> Empresa </option>
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Estatus"
            selectionMessage="Seleccione Estatus"
            field="status_person_id"
            required
            register={register}
            errorsMessageField={
              errors.status_person_id && errors.status_person_id.message
            }
          >
            {statusPersonList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Cedula / Rif"
            field="rif_ci"
            required
            register={register}
            errorsField={errors.rif_ci}
            errorsMessageField={errors.rif_ci && errors.rif_ci.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Pasaporte"
            field="passport"
            required
            register={register}
            errorsField={errors.passport}
            errorsMessageField={errors.passport && errors.passport.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="N° Carnet"
            field="card_number"
            required
            register={register}
            errorsField={errors.card_number}
            errorsMessageField={
              errors.card_number && errors.card_number.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Fecha de Vencimiento"
            field="expiration_date"
            required
            register={register}
            errorsField={errors.expiration_date}
            errorsMessageField={
              errors.expiration_date && errors.expiration_date.message
            }
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Nombre"
            field="name"
            required
            register={register}
            errorsField={errors.name}
            errorsMessageField={errors.name && errors.name.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Apellido"
            field="last_name"
            required
            register={register}
            errorsField={errors.last_name}
            errorsMessageField={errors.last_name && errors.last_name.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Fecha de Nacimiento"
            field="birth_date"
            required
            register={register}
            errorsField={errors.birth_date}
            errorsMessageField={errors.birth_date && errors.birth_date.message}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Estado Civil"
            selectionMessage="Seleccione Estado Civil"
            field="marital_statuses_id"
            required
            register={register}
            errorsMessageField={
              errors.marital_statuses_id && errors.marital_statuses_id.message
            }
          >
            {maritalStatusList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Sexo"
            field="gender_id"
            required
            register={register}
            errorsMessageField={errors.gender_id && errors.gender_id.message}
            selectionMessage="Seleccione Sexo"
          >
            {genderList.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Representante"
            field="representante"
            required
            register={register}
            errorsField={errors.representante}
            errorsMessageField={
              errors.representante && errors.representante.message
            }
          />
        </Grid>
      </Grid>
    );
  };

  const renderAddressData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Direccion"
            field="address"
            register={register}
            errorsField={errors.address}
            errorsMessageField={errors.address && errors.address.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            label="Pais"
            selectionMessage="Seleccione Pais"
            field="countries_id"
            register={register}
            errorsMessageField={
              errors.countries_id && errors.countries_id.message
            }
          >
            {countries.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.description}
              </option>
            ))}
          </CustomSelect>
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Estado"
            field="state"
            register={register}
            errorsField={errors.state}
            errorsMessageField={errors.state && errors.state.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Ciudad"
            field="city"
            register={register}
            errorsField={errors.city}
            errorsMessageField={errors.city && errors.city.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Codigo Postal"
            field="postal_code"
            register={register}
            errorsField={errors.postal_code}
            errorsMessageField={
              errors.postal_code && errors.postal_code.message
            }
          />
        </Grid>
      </Grid>
    );
  };

  const renderContactsData = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Correo Primario"
            field="primary_email"
            register={register}
            errorsField={errors.primary_email}
            errorsMessageField={
              errors.primary_email && errors.primary_email.message
            }
            isEmail
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Correo Secundario"
            field="secondary_email"
            register={register}
            errorsField={errors.secondary_email}
            errorsMessageField={
              errors.secondary_email && errors.secondary_email.message
            }
            isEmail
          />
        </Grid>

        <Grid item xs={3}>
          <CustomTextField
            placeholder="Telefono 1"
            field="telephone1"
            register={register}
            errorsField={errors.telephone1}
            errorsMessageField={errors.telephone1 && errors.telephone1.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Telefono 2"
            field="telephone2"
            register={register}
            errorsField={errors.telephone2}
            errorsMessageField={errors.telephone2 && errors.telephone2.message}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Celular 1"
            field="phone_mobile1"
            register={register}
            errorsField={errors.phone_mobile1}
            errorsMessageField={
              errors.phone_mobile1 && errors.phone_mobile1.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Celular 2"
            field="phone_mobile2"
            register={register}
            errorsField={errors.phone_mobile2}
            errorsMessageField={
              errors.phone_mobile2 && errors.phone_mobile2.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Fax"
            field="fax"
            register={register}
            errorsField={errors.fax}
            errorsMessageField={errors.fax && errors.fax.message}
          />
        </Grid>
      </Grid>
    );
  };

  const renderPaymentMethod = () => {
    const { payment_method_id, share_number } = selectedShare;
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Accion
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Forma de Pago
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Tarjeta 1
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Tarjeta 2
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                Tarjeta 3
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                {share_number}
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                <CustomSelect
                  selectionMessage="Seleccione"
                  field="payment_method_id"
                  register={register}
                  errorsMessageField={
                    errors.payment_method_id && errors.payment_method_id.message
                  }
                >
                  {paymentMethodList.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.description}
                    </option>
                  ))}
                </CustomSelect>
              </TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}></TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}></TableCell>
              <TableCell align="left" style={{ fontSize: "12px" }}>
                <div className="custom-select-container">
                  <select
                    name="card_people3"
                    onChange={() => {}}
                    style={{ fontSize: "13px" }}
                  >
                    <option value="">Seleccione</option>
                    {cardPersonList.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.card_number}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderInvoicePerson = () => {
    const { facturador } = selectedShare;
    return (
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <div className={classes.actionButtonContainer}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              disabled={shareLoading}
              className={classes.submit}
              onClick={() => handleShare()}
            >
              Guardar
            </Button>
            {shareLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid> */}
      </Grid>
    );
  };

  const renderCardPersonData = () => {
    const {
      tarjeta_primaria,
      tarjeta_secundaria,
      tarjeta_terciaria
    } = selectedShare;
    const dataList = [];
    tarjeta_primaria &&
      dataList.push({ ...tarjeta_primaria, orderDetail: "Primario", order: 1 });
    tarjeta_secundaria &&
      dataList.push({ ...tarjeta_secundaria, orderDetail: "Secundario", order: 2  });
    tarjeta_terciaria &&
      dataList.push({ ...tarjeta_terciaria, orderDetail: "Terciario", order: 3  });
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} className="card-person-data-table">
          <DataTable3
            data={dataList}
            columns={cardPersonColumns}
            handleEdit={handleCardPersonEdit}
            isDelete
            handleDelete={handleCardPersonDelete}
            loading={cardPersonLoading}
            fontSize="10px"
          />
        </Grid>
        {!selectedShare.tarjeta_primaria ||
          !selectedShare.tarjeta_secundaria ||
          !selectedShare.tarjeta_terciaria  && (
            <Grid item xs={12} className={classes.cardPersonButtonContainer}>
              <Button
                size="small"
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.cardPersonButton}
                onClick={() => handleCardPersonCreate()}
              >
                Incluir Tarjeta
              </Button>
            </Grid>
          )}
      </Grid>
    );
  };

  let imagePreview = picture;
  if (image.preview) imagePreview = image.preview;
  return (
    <Container component="main" className={classes.formContainer}>
      <div className={classes.paper}>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card className={classes.pictureContainer}>
                    <CardActionArea onClick={() => handleImage()}>
                      <CardMedia
                        className={classes.media}
                        image={imagePreview}
                      />
                    </CardActionArea>
                  </Card>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="load_image"
                    accept="image/*"
                    ref={triggerClick}
                    onChange={loadImage}
                  />
                  <input
                    style={{ display: "none" }}
                    name="picture"
                    ref={register}
                  />
                </Grid>
                <Grid item xs={12} className={classes.profileName}>
                  {name} {last_name}
                </Grid>
                {getShareList.length > 0 && (
                  <Grid item xs={12}>
                    <div className="custom-select-container">
                      <select
                        name="relation"
                        onChange={handleShareSelect}
                        style={{ fontSize: "13px" }}
                      >
                        {getShareList.map((item: any, i: number) => (
                          <option value={item.id}>{item.share_number}</option>
                        ))}
                      </select>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={10}>
              <Grid container spacing={2}>
                <div className={classes.root}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label="Socio" disabled={disableTabs} />
                      <Tab label="Familiares" disabled={disableTabs} />
                      <Tab label="Pagos" disabled={disableTabs} />
                      <Tab label="Notas" disabled={disableTabs} />
                      <Tab label="Expedientes" disabled={disableTabs} />
                      <Tab label="Lockers" disabled={disableTabs} />
                    </Tabs>
                  </AppBar>
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={tabValue}
                    onChangeIndex={handleChangeIndex}
                    className={classes.swipeableViewsContainer}
                  >
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                      <div className={classes.root}>
                        <ExpansionPanel
                          expanded={expanded === "panel1"}
                          onChange={handleExpandedPanel("panel1")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Datos Principales
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderMainData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel2"}
                          onChange={handleExpandedPanel("panel2")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Direccion
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderAddressData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel3"}
                          onChange={handleExpandedPanel("panel3")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Contactos
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {renderContactsData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel4"}
                          onChange={handleExpandedPanel("panel4")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Trabajo
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={3}>
                              {/* <Grid item xs={12}> <Autocomplete /> </Grid> */}
                              <Grid item xs={12} justify="flex-start">
                                {professionList.length > 0 && selectedProff && (
                                  <TransferList
                                    data={professionList}
                                    selectedData={selectedProff}
                                    leftTitle="Profesiones"
                                    onSelectedList={onProfessionsChange}
                                  />
                                )}
                                <input
                                  style={{ display: "none" }}
                                  name="profession_list"
                                  ref={register}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          disabled={disableTabs}
                          expanded={expanded === "panel5"}
                          onChange={handleExpandedPanel("panel5")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Otros
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            campos de otros
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1} dir={theme.direction}>
                      <div className={classes.root}>
                        <ExpansionPanel
                          expanded={expanded === "panel-familiars-assing"}
                          onChange={handleExpandedPanel(
                            "panel-familiars-assing"
                          )}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-familiarsa-assing-content"
                            id="panel-familiarsa-assing-header"
                          >
                            <Typography className={classes.heading}>
                              Buscar familiares
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <CustomSearch handleSearch={handleSearch} />
                              </Grid>
                              <Grid item xs={12}>
                                <DataTableAssignPersons
                                  rows={personsToAssign}
                                  pagination={paginationPersonsToAssign}
                                  handleAssign={handleAssign}
                                  columns={columns}
                                  onChangePage={handleChangePage}
                                  onChangePerPage={handlePerPage}
                                  selectOptionData={relationTypeList}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel
                          expanded={expanded === "panel-familiars"}
                          onChange={handleExpandedPanel("panel-familiars")}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-familiarsa-content"
                            id="panel-familiarsa-header"
                          >
                            <Typography className={classes.heading}>
                              Familiares Asignados
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <DataTable2
                                  data={familyByPerson}
                                  columns={FamilysColumns}
                                  isDelete
                                  handleDelete={handleDeleteRelation}
                                  handleSwitch={handleSwitchRelation}
                                  loading={relationLoading}
                                  fontSize="10px"
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                className={classes.reportButtonContainer}
                              >
                                <LoadingButton
                                  Icon={PrintIcon}
                                  loading={reportByPartnerLoading}
                                  handleClick={() => handleReportByPartner()}
                                />
                              </Grid>
                            </Grid>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2} dir={theme.direction}>
                      {!_.isEmpty(selectedShare) && (
                        <div className={classes.root}>
                          <ExpansionPanel
                            expanded={expanded === "panel-invoice-person"}
                            onChange={handleExpandedPanel(
                              "panel-invoice-person"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-invoice-person-content"
                              id="panel-invoice-person-header"
                            >
                              <Typography className={classes.heading}>
                                Facturar a nombre de
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {getParsePerson(
                                selectedShare.facturador,
                                classes
                              )}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-titular-persona"}
                            onChange={handleExpandedPanel(
                              "panel-titular-persona"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-titular-persona-content"
                              id="panel-titular-persona-header"
                            >
                              <Typography className={classes.heading}>
                                Titular
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {getParsePerson(selectedShare.titular, classes)}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-fiador-persona"}
                            onChange={handleExpandedPanel(
                              "panel-fiador-persona"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-fiador-persona-content"
                              id="panel-fiador-persona-header"
                            >
                              <Typography className={classes.heading}>
                                Fiador
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {getParsePerson(selectedShare.fiador, classes)}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-credit-card"}
                            onChange={handleExpandedPanel("panel-credit-card")}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-credit-card-content"
                              id="panel-credit-card-header"
                            >
                              <Typography className={classes.heading}>
                                Tarjetas de Credito
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              {renderCardPersonData()}
                            </ExpansionPanelDetails>
                          </ExpansionPanel>

                          <ExpansionPanel
                            expanded={expanded === "panel-payment-method"}
                            onChange={handleExpandedPanel(
                              "panel-payment-method"
                            )}
                          >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel-payment-method-content"
                              id="panel-payment-method-header"
                            >
                              <Typography className={classes.heading}>
                                Forma de Pago
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  {renderPaymentMethod()}
                                </Grid>
                              </Grid>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={3} dir={theme.direction}>
                      Notas
                    </TabPanel>
                    <TabPanel value={tabValue} index={4} dir={theme.direction}>
                      Expedientes
                    </TabPanel>
                    <TabPanel value={tabValue} index={5} dir={theme.direction}>
                      Lockers
                    </TabPanel>
                    <TabPanel value={tabValue} index={6} dir={theme.direction}>
                      Actividades
                    </TabPanel>
                  </SwipeableViews>
                </div>
              </Grid>
            </Grid>
          </Grid>

          {tabValue !== 2 && (
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
              >
                {tempPersonId > 0 ? "Update" : "Create"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default PersonForm;
