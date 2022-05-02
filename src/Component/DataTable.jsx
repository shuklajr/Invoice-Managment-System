import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import "./DataTable.css";
import ButtonPanel from "./ButtonPanel";

const useStyles = makeStyles((theme) => ({
  dataGrid: {
    marginBottom: "5rem",
  },
  gridData: {
    "&.MuiDataGrid-root": {
      border: "1px solid rgba(255, 255, 255, 1)",
      color: "white !important",
      fontSize: "13px !important",
    },
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

const DataTable = (props) => {
  const classes = useStyles();
  const [Data, setData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [select, setSelection] = useState([]);
  const [currentRow, setCurrentRow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);
  const [advSearchResults, setAdvSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [edited, setEdited] = useState(false);
  const [custNumSearching, setCustNumSearching] = useState(false);
  const [numberToSearch, setNumberToSearch] = useState({
    cust_number: "",
  });
  const [restored, setRestored] = useState(false);
  const [predicted, setPredicted] = useState(false);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   console.log(page);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleRowSelection = (e) => {
    setSelection(e);
    console.log(e.values);
    console.log(e[0]);
  };

  // Get Row Count

  useEffect(() => {
    axios
      .get(` http://localhost:8080/test_grey_goose/rowCount `)
      .then((res) => {
        // console.log(res.data);
        let data = {
          row_count: res.data,
        };
        setRowCount(data);
        console.log(rowCount);
      });
  }, []);

  // Load Data On Mount

  useEffect(() => {
    axios
      .get(
        ` http://localhost:8080/test_grey_goose/allData?pageNumber=1&total=50000 `
      )
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
  }, []);

  // Get Row Count On Refresh
  useEffect(() => {
    if (refreshed) {
      axios
        .get(` http://localhost:8080/test_grey_goose/rowCount `)
        .then((res) => {
          // console.log(res.data);
          let data = {
            row_count: res.data,
          };
          setRowCount(data);
          console.log(rowCount);
        });
    }
  }, [refreshed]);

  // Load Data When Refresh button on Button panel is Pressed OR Row is edited OR Restored a row

  useEffect(() => {
    if (refreshed || edited || restored || predicted) {
      axios
        .get(
          ` http://localhost:8080/test_grey_goose/allData?pageNumber=1&total=50000 `
        )
        .then((res) => {
          // console.log(res.data);
          setRefreshed(false);
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
  }, [refreshed, edited, restored, predicted]);

  // While Advanced Search
  useEffect(() => {
    if (searching) {
      console.log(advSearchResults);
      setData(advSearchResults);
      setSearching(false);
    }
  }, [searching]);

  // While Searching using Cust Number Only
  useEffect(() => {
    if (custNumSearching) {
      axios
        .get(
          ` http://localhost:8080/test_grey_goose/searchData?cust_number=${numberToSearch.cust_number} `
        )
        .then((res) => {
          // console.log(res.data);
          setRefreshed(false);
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
  }, [custNumSearching, numberToSearch]);

  return (
    <div>
      <ButtonPanel
        select={select}
        refreshed={refreshed}
        setRefreshed={setRefreshed}
        advSearchResults={advSearchResults}
        setAdvSearchResults={setAdvSearchResults}
        searching={searching}
        setSearching={setSearching}
        setEdited={setEdited}
        setSelection={setSelection}
        setCustNumSearching={setCustNumSearching}
        numberToSearch={numberToSearch}
        setRestored={setRestored}
        setPredicted={setPredicted}
      />
      <div style={{ height: 530, width: "100%" }} className={classes.dataGrid}>
        <DataGrid
          className={classes.gridData}
          getRowId={(row) => row.sl_no}
          rows={Data}
          columns={columns}
          //pageSize={5}
          rowHeight={40}
          // rowCount={rowCount.row_count}
          rowsPerPageOptions={[100, 50, 25, 10]}
          rowsPerPage={rowsPerPage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
          // onPageChange={handleChangePage}
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
        )
      </div>
    </div>
  );
};

export default DataTable;
