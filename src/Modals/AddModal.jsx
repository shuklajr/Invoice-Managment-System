import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  OutlinedInput,
  Button,
  alpha,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  addcontainer: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: 530,
    backgroundColor: "#10243a",
    borderRadius: "10px",
    justifyContent: "space-around",
  },
  button: {
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
  },

  txtBox: {
    backgroundColor: "#FFFFFF !important",
    borderRadius: "0.3rem !important",
    width: "100% !important",
  },
}));

const InitialValues = {
  business_code: "",
  cust_number: "",
  clear_date: new Date(),
  buisness_year: "",
  doc_id: "",
  posting_date: new Date(),
  documnet_create_date: new Date(),
  due_in_date: new Date(),
  invoice_currency: "",
  document_type: "",
  posting_id: "",
  total_open_amount: "",
  baseline_create_date: new Date(),
  cust_payment_terms: "",
  invoice_id: "",
};

const AddModal = (props) => {
  const classes = useStyles();
  const { addOpen, setaddOpen } = props;
  const [openAddAlert, setOpenAddAlert] = useState(false);
  const [addActive, setAddActive] = useState(true);
  const [invoiceData, setinvoiceData] = useState(InitialValues);
  const [submitted, setSubmitted] = useState(false);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    invoiceData[name] = value;
    if (
      invoiceData.business_code !== "" &&
      invoiceData.cust_number !== "" &&
      invoiceData.clear_date !== "" &&
      invoiceData.buisness_year !== "" &&
      invoiceData.doc_id !== "" &&
      invoiceData.posting_date !== "" &&
      invoiceData.documnet_create_date !== "" &&
      invoiceData.due_in_date !== "" &&
      invoiceData.invoice_currency !== "" &&
      invoiceData.document_type !== "" &&
      invoiceData.posting_id !== "" &&
      invoiceData.total_open_amount !== "" &&
      invoiceData.baseline_create_date !== "" &&
      invoiceData.cust_payment_terms !== "" &&
      invoiceData.invoice_id !== ""
    ) {
      setAddActive(false);
    } else {
      setAddActive(true);
    }
  };

  const submitHandler = (e) => {
    console.log(invoiceData);
    console.log(JSON.stringify(invoiceData));
    setSubmitted(true);
  };

  // axios({ method:'post', url:'http://localhost:8080/test_grey_goose/addDataTest', data: invoiceData })

  useEffect(() => {
    if (submitted) {
      let str = ``;
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/addDataTest?business_code=${invoiceData.business_code}&customer_number=${invoiceData.cust_number}&clear_date=${invoiceData.clear_date}&buisness_year=${invoiceData.buisness_year}&doc_id=${invoiceData.doc_id}&posting_date=${invoiceData.posting_date}&document_create_date=${invoiceData.document_create_date}&due_in_date=${invoiceData.due_in_date}&invoice_currency=${invoiceData.invoice_currency}&document_type=${invoiceData.document_type}&posting_id=${invoiceData.posting_id}&total_open_amount=${invoiceData.total_open_amount}&baseline_create_date=${invoiceData.baseline_create_date}&cust_payment_terms=${invoiceData.cust_payment_terms}&invoice_id=${invoiceData.invoice_id}`,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log("Post Successful");
            setaddOpen(false);
            setOpenAddAlert(true);
          }
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [submitted]);

  return (
    <div>
      <Modal open={addOpen}>
        <Container className={classes.addcontainer} id="addContainer">
          <h1 sx={{ color: "#111" }}>Add</h1>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  name="business_code"
                  variant="outlined"
                  label="Business Code"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="cust_number"
                  variant="outlined"
                  label="Customer Number"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="clear_date"
                  variant="outlined"
                  type="date"
                  label="Clear Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="buisness_year"
                  variant="outlined"
                  label="Business Year"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="doc_id"
                  variant="outlined"
                  label="Document ID"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="posting_date"
                  variant="outlined"
                  type="date"
                  label="Post Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="document_create_date"
                  variant="outlined"
                  type="date"
                  label="Document Create Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="due_in_date"
                  variant="outlined"
                  type="date"
                  label="Due Date"
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="invoice_currency"
                  variant="outlined"
                  label="Invoice Currency"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="document_type"
                  variant="outlined"
                  label="Document Type"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="posting_id"
                  variant="outlined"
                  label="Posting ID"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="total_open_amount"
                  variant="outlined"
                  label="Total Open Amount"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="baseline_create_date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  label="Baseline Create Date"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="cust_payment_terms"
                  variant="outlined"
                  label="Customer Payment Terms"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  name="invoice_id"
                  variant="outlined"
                  label="Invoice ID"
                  size="small"
                  onChange={handelInputChange}
                  className={classes.txtBox}
                />
              </Grid>
            </Grid>
            <div className={classes.button}>
              <Button
                fullWidth
                variant="outlined"
                className={classes.addButton}
                disabled={addActive ? true : false}
                color="inherit"
                onClick={submitHandler}
              >
                Add
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setaddOpen(false);
                  setinvoiceData(InitialValues);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
      <Snackbar
        open={openAddAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAddAlert(false)}
      >
        <Alert
          onClose={() => setOpenAddAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Row ADDED Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddModal;
