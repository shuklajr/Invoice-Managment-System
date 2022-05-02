import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import Footer from './Component/Footer';
import Header from './Component/Header';
import DataTable from './Component/DataTable';

const useStyles = makeStyles((theme) => ({ 
  dataTableItem:{
    backgroundColor : "#283d4a",
    color: "#fff"
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Grid container direction="column" >
      <Grid item>
        <Header />
      </Grid>
      <Grid item className={classes.dataTableItem}>
        <DataTable />
      </Grid>
      <Grid item>     
        <Footer />
      </Grid>
      {/* <Grid item>
        <Demo />
      </Grid> */}
    </Grid>
  );
}

export default App;
