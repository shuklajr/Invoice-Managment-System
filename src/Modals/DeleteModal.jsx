import React, { useEffect, useState } from "react";
import { Modal, Container, Button, alpha, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import axios from "axios";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  deleteContainer: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    backgroundColor: "#10243a",
    padding: "20px",
    borderRadius: "10px",
    minWidth: 400,
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

const Delete = (props) => {
  const classes = useStyles();
  const { deleteOpen, setdeleteOpen, select, setSelection } = props;
  const [openDeleteAlert, setopenDeleteAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      let str = ``;
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/deleteData?sl_no=${select[0]}`,
      })
        .then((res) => {
          console.log("Deleted");
          setopenDeleteAlert(true);
          setdeleteOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [submitted]);

  const submitHandler = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <Modal open={deleteOpen}>
        <Container className={classes.deleteContainer} id="deleteContainer">
          <Typography variant="h6" component="h2">
            Delete Records ?
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete these record[s] ?
          </Typography>
          <div className={classes.button}>
            <Button
              fullwidth="true"
              variant="outlined"
              color="inherit"
              onClick={() => setdeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              fullwidth="true"
              variant="outlined"
              color="inherit"
              onClick={submitHandler}
            >
              Delete
            </Button>
          </div>
        </Container>
      </Modal>
      <Snackbar
        open={openDeleteAlert}
        autoHideDuration={6000}
        onClose={() => setopenDeleteAlert(false)}
      >
        <Alert
          onClose={() => setopenDeleteAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Row DELETED Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Delete;

// !pip install pickle4
// import pickle
// filename = 'model.sav'
// pickle.dump(regressor, open(filename, 'wb'))
