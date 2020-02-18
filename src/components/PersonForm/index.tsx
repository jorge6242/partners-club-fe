import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/personActions";

const useStyles = makeStyles(theme => ({
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
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -9,
    marginLeft: -9
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  select: {
    padding: '10px 0px 10px 0px',
    width: ' 100%',
    backgroundColor: 'transparent',
    border: 0,
    borderBottom: '1px solid grey',
    fontSize: '16px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
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
};

type PersonFormProps = {
  id?: number;
};

const PersonForm: FunctionComponent<PersonFormProps> = ({ id }) => {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    errors,
    reset,
    setValue
  } = useForm<FormData>();
  const loading = useSelector((state: any) => state.personReducer.loading);
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        setValue("name", response.name);
        setValue("last_name", response.last_name);
        setValue("rif_ci", response.rif_ci);
        setValue("primary_email", response.primary_email);
        setValue("secondary_email", response.secondary_email);
        setValue("passport", response.passport);
        setValue("card_number", response.card_number);
        setValue("birth_date", response.birth_date);
      }
    }
    fetch();
  }, [id, dispatch, setValue]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleForm = (form: object) => {
    console.log('form ', form)
    // if (id) {
    //   dispatch(update({ id, ...form }));
    // } else {
    //   dispatch(create(form));
    // }
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Socio
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Apellido"
                field="last_name"
                required
                register={register}
                errorsField={errors.last_name}
                errorsMessageField={
                  errors.last_name && errors.last_name.message
                }
                isEmail={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Cedula / Rif"
                field="rif_ci"
                required
                register={register}
                errorsField={errors.rif_ci}
                errorsMessageField={
                  errors.rif_ci && errors.rif_ci.message
                }
                isEmail={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Correo Primario"
                field="primary_email"
                required
                register={register}
                errorsField={errors.primary_email}
                errorsMessageField={
                  errors.primary_email && errors.primary_email.message
                }
                isEmail
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Correo Secundario"
                field="secondary_email"
                required
                register={register}
                errorsField={errors.secondary_email}
                errorsMessageField={
                  errors.secondary_email && errors.secondary_email.message
                }
                isEmail
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                placeholder="Fecha de Nacimiento"
                field="birth_date"
                required
                register={register}
                errorsField={errors.birth_date}
                errorsMessageField={
                  errors.birth_date && errors.birth_date.message
                }
                type="date"
                isEmail={false}
              />
            </Grid>
            <Grid item xs={6}>
            <CustomTextField
                placeholder="Pasaporte"
                field="passport"
                required
                register={register}
                errorsField={errors.passport}
                errorsMessageField={
                  errors.passport && errors.passport.message
                }
                isEmail={false}
              />
            </Grid>
            <Grid item xs={6}>
            <CustomTextField
                placeholder="N° Carnet"
                field="card_number"
                required
                register={register}
                errorsField={errors.card_number}
                errorsMessageField={
                  errors.card_number && errors.card_number.message
                }
                isEmail={false}
              />
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
              {id ? "Update" : "Create"}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default PersonForm;
