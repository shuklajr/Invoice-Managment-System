import { makeStyles } from "@material-ui/core";
import { Modal, Container, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import "./style.css";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

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
  chartClass: {
    backgroundColor: "#fff",
    width: "auto",
    maxHeight: "40rem",
  },
  button: {
    marginTop: "1rem",
  },
  switchButtonHolder: {
    display: "flex",
    justifyContent: "space-between",
    marginBlock: "auto",
    textAlign: "center",
    alignItems: "center",
  },
}));

const AnalyticsViewResults = (props) => {
  const classes = useStyles();
  const {
    resultsOpen,
    setresultsOpen,
    analyzeData,
    submitted,
    setSubmitted,
    analyticsResult,
  } = props;
  const [pieActive, setPieActive] = useState(false);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    if (submitted) {
      axios
        .get(` http://localhost:8080/test_grey_goose/pieChartData `)
        .then((res) => {
          // console.log(res.data);
          const data = res.data.map((res, index) => {
            let data = {
              invoice_currency: res.invoice_currency,
              sum_open_amount: res.sum_open_amount,
            };

            return data;
          });

          setPieChartData(data);
        });
    }
  }, [submitted]);

  const barData = {
    labels: analyticsResult?.map((x) => x.business_code),
    datasets: [
      {
        label: `Customer Count`,
        data: analyticsResult?.map((x) => x.customer_count),
        borderColor: ["rgba(255,176,193,0.8)"],
        backgroundColor: ["rgba(255,176,193,0.8)"],
        pointBackgroundColor: ["rgba(255,176,193,0.8)"],
        pointBorderColor: ["rgba(255,176,193,0.8)"],
      },
      {
        label: `Total Open Amount (in ${analyzeData.invoiceCurrency})`,
        data: analyticsResult?.map((x) => x.sum_open_amount),
        borderColor: ["rgba(153,208,245,0.8)"],
        backgroundColor: ["rgba(153,208,245,0.8)"],
        pointBackgroundColor: ["rgba(153,208,245,0.8)"],
        pointBorderColor: ["rgba(153,208,245,0.8)"],
      },
    ],
  };

  const pieData = {
    labels: pieChartData?.map((x) => x.invoice_currency),
    datasets: [
      {
        label: "Sum Open Amount",
        data: pieChartData?.map((x) => x.sum_open_amount),
        borderColor: ["rgba(255,176,193,0.8)"],
        backgroundColor: ["rgba(255,176,193,0.8)", "rgba(153,208,245,0.8)"],
        pointBackgroundColor: ["rgba(255,176,193,0.8)"],
        pointBorderColor: ["rgba(255,176,193,0.8)"],
      },
    ],
  };

  const switchHandler = (e) => {
    setPieActive(!pieActive);
  };

  return (
    <Modal open={resultsOpen}>
      <Container
        className={classes.editcontainer}
        id="analyticsResultContainer"
      >
        <div className={classes.switchButtonHolder}>
          <h1>Analysis Results</h1>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ width: "80px", height: "40px" }}
            onClick={switchHandler}
          >
            SWITCH
          </Button>
        </div>
        {pieActive && <Pie data={pieData} className={classes.chartClass} />}
        {!pieActive && <Bar data={barData} className={classes.chartClass} />}

        <div className={classes.button}>
          <Button
            className={classes.button}
            fullWidth
            variant="outlined"
            color="inherit"
            onClick={() => setresultsOpen(false)}
          >
            CLOSE
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default AnalyticsViewResults;
