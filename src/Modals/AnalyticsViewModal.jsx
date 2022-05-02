import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Button,
  alpha,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AnalyticsViewResults from "./AnalyticsViewResultModal";
import axios from "axios";
import "./style.css";

// USE `test_grey_goose`;
// SELECT w.business_code, COUNT(w.cust_number), SUM(w.total_open_amount) FROM `winter_internship` w WHERE due_in_date BETWEEN '2019-08-11' AND '2019-10-11' AND clear_date BETWEEN '2019-07-11' AND '2020-07-11' AND baseline_create_date BETWEEN '2019-07-01' AND '2019-10-31' GROUP BY business_code;

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
  },
  button: {
    marginTop: "1em",
    display: "flex",
    alignItems: "center",
  },
  txtBox: {
    backgroundColor: "#FFFFFF !important",
    borderRadius: "0.3rem !important",
    width: "100% !important",
  },
}));

const InitialValues = {
  clearDateFrom: new Date(),
  clearDateTo: new Date(),
  dueDateFrom: new Date(),
  dueDateTo: new Date(),
  baselineDateFrom: new Date(),
  baseline_create_dateTO: new Date(),
  invoiceCurrency: "",
};

const AnalyticsView = (props) => {
  const classes = useStyles();
  const { analyticsOpen, setanalyticsOpen } = props;
  const [analyzeData, setAnalyzeData] = useState(InitialValues);
  const [resultsOpen, setresultsOpen] = useState(false);
  const [submitActive, setSubmitActive] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [analyticsResult, setAnalyticsResult] = useState([]);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    analyzeData[name] = value;
    if (
      analyzeData.clearDateFrom !== "" &&
      analyzeData.clearDateTo !== "" &&
      analyzeData.dueDateFrom !== "" &&
      analyzeData.dueDateTo !== "" &&
      analyzeData.baselineDateFrom !== "" &&
      analyzeData.baseline_create_dateTO !== ""
    ) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  };

  const submitHandler = (e) => {
    setanalyticsOpen(false);
    setSubmitted(true);
    setresultsOpen(true);
  };

  useEffect(() => {
    if (submitted) {
      let str = `clearDateFrom=${analyzeData.clearDateFrom}&clearDateTo=${analyzeData.clearDateTo}&dueDateFrom=${analyzeData.dueDateFrom}&dueDateTo=${analyzeData.dueDateTo}&baselineDateFrom=${analyzeData.baselineDateFrom}&baseline_create_dateTO=${analyzeData.baseline_create_dateTO}&invoiceCurrency=${analyzeData.invoiceCurrency}`;
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/analyticsServlet?` + str,
      })
        .then((res) => {
          console.log("Analysis Successful");
          setSubmitted(false);
          console.log(res.data);
          console.log(res.business_code);
          const data = res.data.map((res, index) => {
            let data = {
              business_code: res.business_code,
              customer_count: res.customer_count,
              sum_open_amount: res.sum_open_amount,
            };

            return data;
          });

          setAnalyticsResult(data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [submitted]);

  return (
    <div>
      <Modal open={analyticsOpen}>
        <Container className={classes.advancecontainer} id="analyticsContainer">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Analytics View
          </Typography>
          <form>
            <Grid container spacing={5}>
              <Grid item>
                <p>Clear Date (From - To)</p>
                <TextField
                  name="clearDateFrom"
                  variant="outlined"
                  size="small"
                  type="date"
                  required
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
                <TextField
                  name="clearDateTo"
                  variant="outlined"
                  size="small"
                  type="date"
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
              </Grid>
              <Grid item>
                <p>Due Date (From - To)</p>
                <TextField
                  name="dueDateFrom"
                  variant="outlined"
                  size="small"
                  type="date"
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
                <TextField
                  name="dueDateTo"
                  variant="outlined"
                  size="small"
                  type="date"
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
              </Grid>
              <Grid item>
                <p>Baseline Create Date (From - To)</p>
                <TextField
                  name="baselineDateFrom"
                  variant="outlined"
                  size="small"
                  type="date"
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
                <TextField
                  name="baseline_create_dateTO"
                  variant="outlined"
                  size="small"
                  type="date"
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
              </Grid>
              <Grid item>
                <p>Invoice Currency</p>
                <TextField
                  name="invoiceCurrency"
                  variant="outlined"
                  label="Invoice Currency"
                  size="small"
                  required
                  className={classes.txtBox}
                  onChange={handelInputChange}
                />
              </Grid>
            </Grid>
          </form>
          <div className={classes.button}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              disabled={submitActive}
              onClick={submitHandler}
            >
              Submit
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => {
                setanalyticsOpen(false);
                setAnalyzeData(InitialValues);
              }}
            >
              Cancel
            </Button>
          </div>
        </Container>
      </Modal>
      <AnalyticsViewResults
        resultsOpen={resultsOpen}
        setresultsOpen={setresultsOpen}
        analyzeData={analyzeData}
        submitted={submitted}
        setSubmitted={setSubmitted}
        analyticsResult={analyticsResult}
      />
    </div>
  );
};

export default AnalyticsView;
