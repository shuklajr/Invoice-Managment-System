import React from "react";
import { makeStyles } from "@mui/styles";
import { pxToRem } from "../Utilities/Theme";


const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: "0.5rem",
        padding: "1rem",
        backgroundColor: "#2d4250",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "auto",
        color: "#fff",
        boxShadow: `${pxToRem(13)} ${pxToRem(3)} ${pxToRem(5)} ${pxToRem(6)} rgba(0, 0, 0, 0.3);`
      },
}));

const Footer = () => {
    const classes = useStyles();
    return (
  <div className={classes.footer}>
    <p><a href = "abc" style={{color: "blue"}}>Privacy Policy</a> | &copy; 2022 HighRadius Corporation. All rights reserved.</p>
  </div>
    );
};

export default Footer;