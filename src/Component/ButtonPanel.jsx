import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import "./Style.css";
import AddModal from "../Modals/AddModal";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import AdvancedSearchModal from "../Modals/AdvancedSearchModal";
import AnalyticsViewModal from "../Modals/AnalyticsViewModal";
import RecentlyDeleted from "../Modals/RecentlyDeletedModal";
import Predict from "../Modals/Predict";

const useStyles = makeStyles((theme) => ({
  buttonPanel: {
    backgroundColor: "#283d4a",
    color: "#fff",
    height: "4rem",
  },
  search: {
    backgroundColor: alpha("#fff", 1),
    "&:hover": {
      backgroundColor: alpha("#111", 0),
    },
  },
  toggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    "& > *": {
      m: 1,
    },
  },
  toggleButtonGroup: {
    color: "#fff",
    marginRight: "0",
  },
  buttonGrouptwo: {},
  recentyleDeleted: {
    display: "flex",
    marginRight: "0px",
    marginLeft: "5rem",
    justifyContent: "space-around",
  },
  fetchDeleted: {
    display: "flex",
    marginRight: "0px",
    marginLeft: "5rem",
    justifyContent: "space-around",
  },
}));

const ButtonPanel = (props) => {
  const [alignment, setAlignment] = useState("predict");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const classes = useStyles();
  const [addOpen, setaddOpen] = useState(false);
  const [editOpen, seteditOpen] = useState(false);
  const [advanceOpen, setadvanceOpen] = useState(false);
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [analyticsOpen, setanalyticsOpen] = useState(false);
  const [editEnable, setEditEnable] = useState(true);
  const [deleteEnable, setDeleteEnable] = useState(true);
  const [predictDisable, setPredictDisable] = useState(true);
  const [openPredictAlert, setOpenPredictAlert] = useState(false);
  const [predictPressed, setPredictPressed] = useState(false);
  const {
    select,
    setSelection,
    setRefreshed,
    setAdvSearchResults,
    advSearchResults,
    setSearching,
    searching,
    setEdited,
    setCustNumSearching,
    numberToSearch,
    setRestored,
    setPredicted,
  } = props;
  const [recentlyDeletedOpen, setRecentlyDeletedOpen] = useState(false);

  useEffect(() => {
    if (select.length == 1) {
      setEditEnable(false);
      setDeleteEnable(false);
      setPredictDisable(false);
    } else {
      setEditEnable(true);
      setDeleteEnable(true);
      setPredictDisable(true);
    }
  }, [select]);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    numberToSearch[name] = value;
    setCustNumSearching(true);
    if (numberToSearch.cust_number == "") {
      setCustNumSearching(false);
      setRefreshed(true);
    }
  };

  const buttonsSet1 = [
    <Button
      key="one"
      id="button"
      sx={{ backgroundColor: "#14aff1" }}
      className={classes.predictButton}
      variant="contained"
      endIcon={<OnlinePredictionIcon />}
      onClick={() => setPredictPressed(true)}
      disabled={predictDisable}
      color="inherit"
    >
      PREDICT
    </Button>,
    <Button
      key="two"
      id="button"
      endIcon={<AnalyticsIcon />}
      color="inherit"
      onClick={() => setanalyticsOpen(true)}
    >
      ANALYTICS VIEW
    </Button>,
    <Button
      key="three"
      id="button"
      endIcon={<ManageSearchIcon />}
      color="inherit"
      onClick={() => setadvanceOpen(true)}
    >
      ADVANCED SEARCH
    </Button>,
  ];

  const buttonsSet2 = [
    <Button
      key="one"
      endIcon={<AddIcon />}
      sx={{ borderRightColor: "#ffffff" }}
      id="addButton"
      color="inherit"
      onClick={() => setaddOpen(true)}
    >
      ADD
    </Button>,

    <Button
      key="two"
      endIcon={<EditIcon />}
      id="button"
      disabled={editEnable}
      color="inherit"
      onClick={() => seteditOpen(true)}
    >
      EDIT
    </Button>,

    <Button
      key="three"
      endIcon={<DeleteForeverIcon />}
      id="button"
      disabled={deleteEnable}
      color="inherit"
      onClick={() => setdeleteOpen(true)}
    >
      DELETE
    </Button>,
  ];

  return (
    <Box
      className={classes.buttonPanel}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        size="small"
        fullWidth
        aria-label="small button group"
        className={classes.buttonGroup}
      >
        {buttonsSet1}
      </ButtonGroup>

      {/* REFRESH BUTTON AND SEARCH INPUT */}

      <IconButton
        color="inherit"
        aria-label="upload picture"
        size="small"
        onClick={() => setRefreshed(true)}
      >
        <RefreshIcon />
      </IconButton>
      <FormControl sx={{ width: "60ch" }} size="small" variant="outlined">
        <OutlinedInput
          id="inputID"
          name="cust_number"
          placeholder="Search Cutomer ID"
          className={classes.search}
          onChange={handelInputChange}
        />
      </FormControl>

      {/* BUTTON GROUP  */}

      <ButtonGroup
        size="small"
        fullWidth
        aria-label="small button group"
        className={classes.buttonGrouptwo}
      >
        {buttonsSet2}
      </ButtonGroup>
      <IconButton
        color="inherit"
        aria-label="upload picture"
        size="small"
        className={classes.fetchDeleted}
        onClick={() => setRecentlyDeletedOpen(true)}
      >
        <RestoreFromTrashIcon />
      </IconButton>
      <AddModal addOpen={addOpen} setaddOpen={setaddOpen} />
      <EditModal
        editOpen={editOpen}
        seteditOpen={seteditOpen}
        select={select}
        setEdited={setEdited}
        setSelection={setSelection}
      />
      <DeleteModal
        deleteOpen={deleteOpen}
        setdeleteOpen={setdeleteOpen}
        select={select}
        setSelection={setSelection}
      />
      <AdvancedSearchModal
        advanceOpen={advanceOpen}
        setadvanceOpen={setadvanceOpen}
        advSearchResults={advSearchResults}
        setAdvSearchResults={setAdvSearchResults}
        searching={searching}
        setSearching={setSearching}
      />
      <AnalyticsViewModal
        analyticsOpen={analyticsOpen}
        setanalyticsOpen={setanalyticsOpen}
      />
      <RecentlyDeleted
        recentlyDeletedOpen={recentlyDeletedOpen}
        setRecentlyDeletedOpen={setRecentlyDeletedOpen}
        setRestored={setRestored}
      />
      <Predict
        openPredictAlert={openPredictAlert}
        setOpenPredictAlert={setOpenPredictAlert}
        setPredictPressed={setPredictPressed}
        predictPressed={predictPressed}
        select={select}
        setPredicted={setPredicted}
      />
    </Box>
  );
};

export default ButtonPanel;
