import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  OutlinedInput,
  Button,
  alpha,
  Typography,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  advancecontainer: {
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
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
}));

const InitialValues = {
  doc_id: "",
  invoice_id: "",
  cust_number: "",
  buisness_year: "",
};

const AdvancedSearch = (props) => {
  const classes = useStyles();
  const {
    advanceOpen,
    setadvanceOpen,
    advSearchResults,
    setAdvSearchResults,
    searching,
    setSearching,
  } = props;
  const [searchData, setSearchData] = useState(InitialValues);
  const [submitted, setSubmitted] = useState(false);
  const [send, setSend] = useState(false);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    searchData[name] = value;
  };

  const submitHandler = (e) => {
    console.log(searchData);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      let str = `doc_id=${searchData.doc_id}&invoice_id=${searchData.invoice_id}&cust_number=${searchData.cust_number}&buisness_year=${searchData.buisness_year}`;
      axios
        .get(`http://localhost:8080/test_grey_goose/advancedSearch?` + str)
        .then((res) => {
          console.log(res.data);
          setadvanceOpen(false);
          setSubmitted(false);
          setSend(true);
          const data = res.data.map((res, index) => {
            let data = {
              sl_no: res.sl_no,
              business_code: res.business_code,
              cust_number: res.cust_number,
              clear_date: res.clear_date,
              buisness_year: res.buisness_year,
              doc_id: res.doc_id,
              posting_date: res.posting_date,
              document_create_date: res.document_create_date,
              due_in_date: res.due_in_date,
              invoice_currency: res.invoice_currency,
              document_type: res.document_type,
              posting_id: res.posting_id,
              total_open_amount: res.total_open_amount,
              baseline_create_date: res.baseline_create_date,
              cust_payment_terms: res.cust_payment_terms,
              invoice_id: res.invoice_id,
              aging_bucket: res.aging_bucket,
            };

            return data;
          });

          setAdvSearchResults(data);
          setSearching(true);
        });
    }
  }, [submitted]);

  return (
    <div>
      <Modal open={advanceOpen}>
        <Container className={classes.advancecontainer} id="editContainer">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Advanced Search
          </Typography>
          <form className={classes.form} autoComplete="off">
            <OutlinedInput
              name="doc_id"
              id="inputID-button-input"
              type="number"
              placeholder="Document ID"
              className={classes.input}
              onChange={handelInputChange}
            />

            <OutlinedInput
              name="invoice_id"
              id="inputID-button-input"
              type="number"
              placeholder="Invoice ID"
              className={classes.input}
              onChange={handelInputChange}
            />

            <OutlinedInput
              name="cust_number"
              id="inputID-button-input"
              type="number"
              placeholder="Customer Number"
              className={classes.input}
              onChange={handelInputChange}
            />
            <OutlinedInput
              name="buisness_year"
              id="inputID-button-input"
              type="number"
              placeholder="Business Year"
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
                Search
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => setadvanceOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </Modal>
    </div>
  );
};

export default AdvancedSearch;
