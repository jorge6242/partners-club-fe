import React, { useEffect, FunctionComponent, useState } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
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
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CustomSelect from "../FormElements/CustomSelect";
import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/personActions";
import { getAll as getStatusPersonAll } from "../../actions/statusPersonActions";
import { getAll as getMaritalStatusAll } from "../../actions/maritalStatusActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getAll as getCountries } from "../../actions/countryActions";

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
  postal_code: string;
  status_person_id: number;
  marital_statuses_id: number;
  countries_id: number;
};

type PersonFormProps = {
  id?: number;
};

const PersonForm: FunctionComponent<PersonFormProps> = ({ id }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tempPersonId, setTempPersonId] = useState(0);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageField, setImageField] = useState();
  const [value, setTab] = useState(0);
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    getValues
  } = useForm<FormData>();
  const { picture } = getValues();
  const loading = useSelector((state: any) => state.personReducer.loading);
  const { list: statusPersonList } = useSelector(
    (state: any) => state.statusPersonReducer
  );
  const { list: maritalStatusList } = useSelector(
    (state: any) => state.maritalStatusReducer
  );
  const { countries } = useSelector((state: any) => state.countryReducer);
  const { list: genderList } = useSelector((state: any) => state.genderReducer);
  const disableTabs = tempPersonId > 0 ? false : true;

  const handleChange = (event: React.ChangeEvent<{}>, tabValue: number) => {
    setTab(tabValue);
  };

  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  const handleExpandedPanel = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getStatusPersonAll());
    dispatch(getMaritalStatusAll());
    dispatch(getGenderAll());
    dispatch(getCountries());
    async function fetch() {
      if (id) {
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
          postal_code,
          status_person_id,
          marital_statuses_id,
          countries_id
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
        setValue("status_person_id", status_person_id);
        setValue("marital_statuses_id", marital_statuses_id);
        setValue("countries_id", countries_id);
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
    console.log("form ", form);
    if (tempPersonId > 0) {
      dispatch(update({ id: tempPersonId, ...form }));
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
    console.log("handleImage ");
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
      console.log("reader.result ", reader.result);
      setValue("picture", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const renderMainData = () => {
    return (
      <Grid container spacing={2}>
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

  const renderContacData = () => {
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
            errorsMessageField={
              errors.state && errors.state.message
            }
          />
        </Grid>
        <Grid item xs={3}>
          <CustomTextField
            placeholder="Ciudad"
            field="city"
            register={register}
            errorsField={errors.city}
            errorsMessageField={
              errors.city && errors.city.message
            }
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
    )
  }

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
              <Card className={classes.pictureContainer}>
                <CardActionArea onClick={() => handleImage()}>
                  <CardMedia className={classes.media} image={imagePreview} />
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
                onChange={loadImage}
                ref={register}
              />
            </Grid>

            <Grid item xs={10}>
              <Grid container spacing={2}>
                <div className={classes.root}>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={value}
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
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <div className={classes.root}>
                        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleExpandedPanel('panel1')}>
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

                        <ExpansionPanel  disabled={disableTabs} expanded={expanded === 'panel2'} onChange={handleExpandedPanel('panel2')}>
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
                            {renderContacData()}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel disabled={disableTabs} expanded={expanded === 'panel3'} onChange={handleExpandedPanel('panel3')}>
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

                        <ExpansionPanel disabled={disableTabs} expanded={expanded === 'panel4'} onChange={handleExpandedPanel('panel4')}>
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
                            campos de trabajo
                          </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel disabled={disableTabs} expanded={expanded === 'panel5'} onChange={handleExpandedPanel('panel5')}>
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
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      Familiares
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                      Pagos
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                      Notas
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                      Expedientes
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                      Lockers
                    </TabPanel>
                  </SwipeableViews>
                </div>
              </Grid>
            </Grid>
          </Grid>

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
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default PersonForm;
