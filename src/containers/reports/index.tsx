import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import "./index.sass";
import WidgetReport from "../../components/WidgetReport";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
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
  },
  progress: {
    margin: theme.spacing(2),
    position: 'relative',
    top: '45%',
  },
}),
  );

export default function Reports() {
 const classes = useStyles();
 const history = useHistory();

  const handlePreview = (path: string) => {
    history.push(path);
  };


 return (
    <div className="report-container">
      <Grid container spacing={3} className={classes.widgetContainer}>
        <Grid item xs={3}>
          <WidgetReport title="Tarjetas Vencidas" handleClick={() => handlePreview("/template/expiration-cards")}/>
        </Grid>
        <Grid item xs={3}>
        
        </Grid>
        <Grid item xs={3}>
       
        </Grid>
      </Grid>
    </div>
  );
}
