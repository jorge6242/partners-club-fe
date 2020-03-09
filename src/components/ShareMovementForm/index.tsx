import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import _ from 'lodash';

import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/shareMovementActions";
import { searchToAssign } from "../../actions/shareActions";
import AutoComplete from "../AutoComplete";
import { searchPartnersToAssign, searchTitularToAssign } from "../../actions/personActions";

const useStyles = makeStyles(theme => ({
  rootShareMovementForm: {
    flexGrow: 1
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
    padding: "10px 0px 10px 0px",
    width: " 100%",
    backgroundColor: "transparent",
    border: 0,
    borderBottom: "1px solid grey",
    fontSize: "16px"
  }
}));

type FormData = {
  description: string;
  rate: string;
};

type ShareMovementFormProps = {
  id?: number;
};

const ShareMovementForm: FunctionComponent<ShareMovementFormProps> = ({
  id
}) => {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const { shareToAssignList, loading: shareLoading } = useSelector(
    (state: any) => state.shareReducer
  );
  const { partnersToAssign, titularToAssign, setPartnersLoading, setTitularLoading } = useSelector(
    (state: any) => state.personReducer
  );
  const loading = useSelector(
    (state: any) => state.shareMovementReducer.loading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        setValue("description", response.description);
        setValue("rate", response.rate);
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
    if (id) {
      dispatch(update({ id, ...form }));
    } else {
      dispatch(create(form));
    }
  };

  const handleSearchShares = (event: any, value: any) => {
    console.log('event ', event);
    console.log('value ', value);
      dispatch(searchToAssign(value))
    if(event.type === 'click') {
      console.log('value ', value);
    }
     return () => {};
  };

  const handleSearchPartners = (event: any, value: any) => {
    if(event.type === 'change') {
      dispatch(searchPartnersToAssign(value))
    }
    if(event.type === 'click') {
      console.log('value ', value);
    }
     return () => {};
  };

  const handleSearchTitular = (event: any, value: any) => {
    if(event.type === 'change') {
      dispatch(searchTitularToAssign(value))
    }
    if(event.type === 'click') {
      console.log('value ', value);
    }
     return () => {};
  };

  const handleSelectShare = (option: any, value: any) => {
    return option.share_number === value.share_number;
  };

  const handleSelectPerson = (option: any, value: any) => {
    return option.name === value.name;
  };

  const getOptionLabelShare = (option: any) => {
    return option.share_number;
  };

  const getOptionLabelPerson = (option: any) => {
    return option.name;
  };

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Movimiento Accion
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className={classes.rootShareMovementForm}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AutoComplete
                  label="Accion"
                  options={shareToAssignList}
                  handleSearch={handleSearchShares}
                  getOptionLabel={getOptionLabelShare}
                  handleSelectShare={handleSelectShare}
                  loading={shareLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  label="Socio"
                  options={partnersToAssign}
                  handleSearch={handleSearchPartners}
                  getOptionLabel={getOptionLabelPerson}
                  handleSelectShare={handleSelectPerson}
                  loading={setPartnersLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  label="Titular"
                  options={titularToAssign}
                  handleSearch={handleSearchTitular}
                  getOptionLabel={getOptionLabelPerson}
                  handleSelectShare={handleSelectPerson}
                  loading={setTitularLoading}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  placeholder="Description"
                  field="description"
                  required
                  register={register}
                  errorsField={errors.description}
                  errorsMessageField={
                    errors.description && errors.description.message
                  }
                  isEmail={false}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomTextField
                  placeholder="Tarifa"
                  field="rate"
                  required
                  register={register}
                  errorsField={errors.rate}
                  errorsMessageField={errors.rate && errors.rate.message}
                  isEmail={false}
                />
              </Grid>
              <Grid item xs={12}>
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
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ShareMovementForm;
