import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const useStyles = makeStyles((theme) => {});

const Predict = (props) => {
  const classes = useStyles();
  const {
    openPredictAlert,
    setOpenPredictAlert,
    select,
    setPredictPressed,
    predictPressed,
    setPredicted,
  } = props;
  const [predictRow, setPredictRow] = useState([]);
  const [getAgingBucket, setGetAgingBucket] = useState(false);
  const [agingBucket, setAgignBucket] = useState([]);
  const [callServ, setCallServ] = useState(false);

  //   GET SELECTED ROW DATA

  useEffect(() => {
    if (predictPressed) {
      axios
        .get(
          ` http://localhost:8080/test_grey_goose/getPredictionRow?sl_no=${select[0]} `
        )
        .then((res) => {
          console.log(res.data);
          console.log("Row to predict Fetched");
          const data = res.data.map((res, index) => {
            let data = {
              business_code: res.business_code,
              cust_number: res.cust_number,
              name_customer: res.name_customer,
              clear_date: res.clear_date,
              buisness_year: res.buisness_year,
              doc_id: res.doc_id,
              posting_date: res.posting_date,
              document_create_date: res.document_create_date,
              due_in_date: res.due_in_date,
              baseline_create_date: res.baseline_create_date,
              cust_payment_terms: res.cust_payment_terms,
              converted_usd: res.converted_usd,
            };

            return data;
          });

          setPredictRow(data);
          setGetAgingBucket(true);
        });
    }
  }, [predictPressed]);

  //   GET AGING_BUCKET OF SELECTED ROW

  useEffect(() => {
    if (getAgingBucket) {
      axios({
        method: "post",
        url: `http://127.0.0.1:5000/all`,
        data: predictRow,
      })
        .then((res) => {
          console.log(res.data);
          console.log("Aging Bucket Fetched");
          setAgignBucket(res.data);
          setCallServ(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getAgingBucket]);

  //   SET AGING_BUCKET TO DATABASE
  useEffect(() => {
    if (callServ) {
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/setPredictionData?aging_bucket=${agingBucket.aging_bucket}&sl_no=${select[0]}`,
      })
        .then((res) => {
          console.log("Prediction Completed and Data set to aging bucket");
          setOpenPredictAlert(true);
          setPredicted(true);
          setPredictPressed(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [callServ]);

  return (
    <Snackbar
      open={openPredictAlert}
      autoHideDuration={6000}
      onClose={() => setOpenPredictAlert(false)}
    >
      <Alert
        onClose={() => setOpenPredictAlert(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        Prediction Successful!
      </Alert>
    </Snackbar>
  );
};

export default Predict;
