import React, { useState, useEffect } from "react";
import { Modal, Container, Button, alpha, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  recentlyDeleteContainer: {
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
  restoreButtonHolder: {
    display: "flex",
    justifyContent: "space-between",
    marginBlock: "auto",
    textAlign: "center",
    alignItems: "center",
  },
}));

const columns = [
  { field: "sl_no", headerName: "Sl no", width: 60 },
  {
    field: "business_code",
    headerName: "Business Code",
    width: 100,
  },
  {
    field: "cust_number",
    headerName: "Customer Number",
    width: 110,
  },
  {
    field: "clear_date",
    headerName: "Clear Date",
    width: 120,
  },
  {
    field: "buisness_year",
    headerName: "Business Year",
    width: 100,
  },
  { field: "doc_id", headerName: "Document Id", width: 110 },
  {
    field: "posting_date",
    headerName: "Posting Date",
    width: 110,
  },
  {
    field: "document_create_date",
    headerName: "Document Create Date",
    width: 110,
  },
  { field: "due_in_date", headerName: "Due Date", width: 110 },
  {
    field: "invoice_currency",
    headerName: "Invoice Currency",
    width: 110,
  },
  {
    field: "document_type",
    headerName: "Document Type",
    width: 110,
  },
  {
    field: "posting_id",
    headerName: "Posting Id",
    width: 110,
  },
  { field: "total_open_amount", headerName: "Total Open Amount", width: 110 },
  {
    field: "baseline_create_date",
    headerName: "Baseline Create Date",
    width: 110,
  },
  {
    field: "cust_payment_terms",
    headerName: "Payment Terms",
    width: 110,
  },
  { field: "invoice_id", headerName: "Invoice Id", width: 110 },
  { field: "aging_bucket", headerName: "Aging Bucket", width: 110 },
];

const RecentlyDeleted = (props) => {
  const classes = useStyles();
  const { recentlyDeletedOpen, setRecentlyDeletedOpen, setRestored } = props;
  const [Data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [restoreDisable, setRestoreDisable] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleRowSelection = (e) => {
    if (e.length == 1) {
      setRestoreDisable(false);
      setSelectedRow(e);
    } else {
      setRestoreDisable(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      let str = ``;
      axios({
        method: "post",
        url: `http://localhost:8080/test_grey_goose/restoreRows?sl_no=${selectedRow[0]}`,
      })
        .then((res) => {
          console.log("Restored");
          setRecentlyDeletedOpen(false);
          setRestored(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [submitted]);

  const handleRestore = (e) => {
    setSubmitted(true);
  };

  useEffect(() => {
    if (recentlyDeletedOpen) {
      axios
        .get(` http://localhost:8080/test_grey_goose/recentlyDeleted `)
        .then((res) => {
          // console.log(res.data);
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

          setData(data);
        });
    }
  }, [recentlyDeletedOpen]);

  return (
    <div>
      <Modal open={recentlyDeletedOpen}>
        <Container
          className={classes.recentlyDeleteContainer}
          id="recentlyDeletedContainer"
        >
          <div className={classes.restoreButtonHolder}>
            <h1>RECENTLY DELETED</h1>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ width: "80px", height: "40px" }}
              disabled={restoreDisable}
              onClick={handleRestore}
            >
              Restore
            </Button>
          </div>
          <div
            style={{ height: 530, width: "100%" }}
            className={classes.dataGrid}
          >
            <DataGrid
              className={classes.gridData}
              getRowId={(row) => row.sl_no}
              rows={Data}
              columns={columns}
              rowHeight={40}
              rowsPerPageOptions={[100, 50, 25, 10]}
              disableSelectionOnClick
              disableColumnMenu
              checkboxSelection
              onSelectionModelChange={handleRowSelection}
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  textOverflow: "clip",
                  whiteSpace: "break-spaces",
                  lineHeight: 1,
                },
              }}
            />
          </div>
          <div className={classes.button}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => setRecentlyDeletedOpen(false)}
            >
              CLOSE
            </Button>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default RecentlyDeleted;
