import React, { useEffect, FunctionComponent } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import TransferList from "../TransferList";
import CustomTextField from "../FormElements/CustomTextField";
import { update, create, get } from "../../actions/roleActions";
import { getAll as getAllPermissions } from "../../actions/permissionActions";

const useStyles = makeStyles(theme => ({
  rootRoleForm: {
    width: "100%"
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
  name: string;
  slug: string;
  description: string;
};

type FormComponentProps = {
  id?: number;
};

const RoleForm: FunctionComponent<FormComponentProps> = ({ id }) => {
  const classes = useStyles();
  const { handleSubmit, register, errors, reset, setValue } = useForm<
    FormData
  >();
  const loading = useSelector((state: any) => state.roleReducer.loading);
  const { list } = useSelector((state: any) => state.permissionReducer);
  const dispatch = useDispatch();
  console.log('list ', list);
  useEffect(() => {
      dispatch(getAllPermissions());
    async function fetch() {
      if (id) {
        const response: any = await dispatch(get(id));
        setValue("name", response.name);
        setValue("slug", response.slug);
        setValue("description", response.description);
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

  const onPermissionsChange = (event: any) => {
    console.log("event ", event);
  };

  return (
    <Container component="main" className={classes.rootRoleForm}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Rol
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextField
                    placeholder="Nombre"
                    field="name"
                    required
                    register={register}
                    errorsField={errors.name}
                    errorsMessageField={errors.name && errors.name.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    placeholder="Clave"
                    field="slug"
                    required
                    register={register}
                    errorsField={errors.slug}
                    errorsMessageField={
                      errors.slug && errors.slug.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    placeholder="Descripcion"
                    field="description"
                    required
                    register={register}
                    errorsField={errors.description}
                    errorsMessageField={
                      errors.description && errors.description.message
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid item xs={12}>
                {list.length > 0 && (
                  <TransferList
                    data={list}
                    selectedData={[]}
                    leftTitle="Permisos"
                    onSelectedList={onPermissionsChange}
                  />
                )}
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
};

export default RoleForm;
