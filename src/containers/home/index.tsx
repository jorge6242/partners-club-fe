import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import FaceIcon from "@material-ui/icons/Face";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import "./index.sass";
import Widgtet from "../../components/Widget";
import Chart from "../../components/chart";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  widgetContainer: {
      marginBottom: '100px',
  }
});

export default function Home() {
 const classes = useStyles();
  return (
    <div className="home-container">
      <Grid container spacing={3} className={classes.widgetContainer}>
        <Grid item xs={3}>
          <Widgtet title="Socios" amount="87" Icon={FaceIcon} />
        </Grid>
        <Grid item xs={3}>
          <Widgtet title="Usuarios" amount="43" Icon={PeopleAltIcon} />
        </Grid>
        <Grid item xs={3}>
          <Widgtet title="Ingresos" amount="1500" Icon={AccountBalanceIcon} />
        </Grid>
        <Grid item xs={3}>
          <Widgtet title="Produccion" amount="5000" Icon={EqualizerIcon} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Chart title={"Ingresos"} type={"bar"}/>
        </Grid>
        <Grid item xs={6}>
          <Chart title={"Egresos"} type={"doughnut"}/>
        </Grid>
      </Grid>
    </div>
  );
}
