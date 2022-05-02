import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import hrcLogo from '../Assets/hrcLogo.svg'
import companyLogo from '../Assets/abcLogo.png';
import { makeStyles } from "@mui/styles";
import { pxToRem } from "../Utilities/Theme";

const useStyles = makeStyles((theme) => ({
    companyLogo :{
        maxWidth: "50%",
        maxHeight: "70%",
        padding: "2em",
        display: "flex",
        width: pxToRem(200),
    },
    hrcLogo:{
        padding: "2em",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        textAlign: "center",
        maxWidth: "50%",
        maxHeight: "70%"
    },
    toolBar:{
        backgroundColor : "#2d4250",
        display: "flex",
        minHeight: pxToRem(120),
    },
    appBar:{
        minHeight: '100px'
    },
    horizontalAlign:{
    position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }
}));

const Header = () => {
    const classes = useStyles();
    return(
        <AppBar position="static" elevation={10} className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <img src={companyLogo} alt="comapny logo" className={classes.companyLogo}/>
                <div className={classes.horizontalAlign}>
                    <img src={hrcLogo} alt="logo" className={classes.hrcLogo}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};


export default Header;