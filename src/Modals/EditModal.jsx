import React, { useEffect, useState } from "react";
import { Modal, Container, OutlinedInput, Button, alpha } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import axios from "axios";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  editcontainer: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    backgroundColor: "#10243a",
    padding: "20px",
    borderRadius: "10px",
  },
  input: {
    height: "40px",
    width: "25ch",
    marginTop: "20px",
    marginRight: "50px",
    marginBottom: "30px",
    backgroundColor: alpha("#fff", 1),
    "&:hover": {
      backgroundColor: alpha("#111", 0.1),
    },
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
}));

const InitialValues = {
  invoice_currency: "",
  cust_payment_terms: "",
};

const Edit = (props) => {
  const classes = useStyles();
  const { editOpen, seteditOpen, select, setEdited, setSelection } = props;
  const [openEditAlert, setopenEditAlert] = useState(false);
  const [updateValues, setUpdateValues] = useState(InitialValues);
  const [submitted, setSubmitted] = useState(false);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    updateValues[name] = value;
  };

  const submitHandler = () => {
    console.log(updateValues);
    setSubmitted(true);
    console.log(select[0]);
  };

  useEffect(() => {
    if (submitted) {
      let str = ``;
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/editData?invoice_currency=${updateValues.invoice_currency}&cust_payment_terms=${updateValues.cust_payment_terms}&sl_no=${select[0]}`,
      })
        .then((res) => {
          console.log("Edited");
          setopenEditAlert(true);
          seteditOpen(false);
          setEdited(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [submitted]);

  return (
    <div>
      <Modal open={editOpen}>
        <Container className={classes.editcontainer} id="editContainer">
          <h1>Edit</h1>
          <form className={classes.form} autoComplete="off">
            <OutlinedInput
              name="invoice_currency"
              id="inputID-button-input"
              placeholder="Invoice Currency"
              className={classes.input}
              onChange={handelInputChange}
            />
            <OutlinedInput
              name="cust_payment_terms"
              id="inputID-button-input"
              placeholder="Customer Payment Terms"
              className={classes.input}
              onChange={handelInputChange}
            />
            <div className={classes.button}>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={submitHandler}
              >
                Edit
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => seteditOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openEditAlert}
        autoHideDuration={6000}
        onClose={() => setopenEditAlert(false)}
      >
        <Alert
          onClose={() => setopenEditAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Row EDITED Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Edit;
