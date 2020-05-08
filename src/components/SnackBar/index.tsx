import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import parse from 'react-html-parser';

import snackBarUpdate from '../../actions/snackBarActions'

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    '&': {

    },
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
  },
  customSnackBar: {
    left: '58% !important'
  }
}));

export default function SnackBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { status, message, type, autoHide } = useSelector((state: any) => state.snackBarReducer);

  const handleClose = () => {
    dispatch(
      snackBarUpdate({
        payload: {
          message: "",
          status: false,
          type: "",
          autoHide: false,
        }
      })
    );
  };

  return (
    <div className={classes.root}>
      <Snackbar open={status} autoHideDuration={autoHide ? 20000 : null} onClose={handleClose} className={classes.customSnackBar} >
        <Alert onClose={handleClose} severity={type}>
          {parse(message)}
        </Alert>
      </Snackbar>
    </div>
  );
}
