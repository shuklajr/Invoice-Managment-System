import axios from "axios";


// const [searchResult, setSearchResult] = useState([]);
// const [advancedSearchResult, setAdvancedSearchResult] = useState([]);
// const [analyticsData, setAnalyticsData] = useState([]);
// const [rowData, setRowData] = useState([]);

export const advancedSearch = async() => 
async({doc_id, invoice_id, cust_number, buisness_year}) => {
    let str = "doc_id="+doc_id+"&invoice_id="+invoice_id+"&cust_number="+cust_number+"&buisness_year="+buisness_year;
    let response = await axios.get("http://localhost:8080/test_grey_goose/advancedSearch?" + str);
    return response.data;
}

export const updateRow = () => 
async({sl_no, invoice_cuurency, cust_payment_terms}) => {
    let str = "invoice_currency="+invoice_cuurency+"&cust_payment_terms="+cust_payment_terms+"&sl_no="+sl_no;
    let response = await axios.post("http://localhost:8080/test_grey_goose/editData?"+str);
    return response.data;
}

export const searchRow = () => 
async({cust_number}) => {
    let str = "cust_number="+cust_number;
    let response = await axios.get("http://localhost:8080/test_grey_goose/searchData?"+str);
    return response.data;
}


export const deleteRow = () => 
async({sl_no}) => {
    let str = "sl_no="+sl_no;
    let response = await axios.post("http://localhost:8080/test_grey_goose/deleteData?"+str);
    return response.data;
}

export const graphData = () => 
async({clearDateFrom, clearDateTo, dueDateFrom, dueDateTo, baselineDateFrom, baselineDateTo, invoice_currency}) => {
    let str = "clearDateFrom="+clearDateFrom+"&clearDateTo="+clearDateTo+"&dueDateFrom="+dueDateFrom+"&dueDateTo="+dueDateTo+"&baselineDateFrom="+baselineDateFrom+"&baselineDateTo="+baselineDateTo+"&invoice_currency="+invoice_currency;
    let response = await axios.post("http://localhost:8080/test_grey_goose/analyticsServlet?"+str);
    return response.data;
};

export const tableData = () => 
    async({page, total}) => {
        let str = "pageNumber="+page+"&total=48592";
        let response = await axios.get(` http://localhost:8080/test_grey_goose/allData?`+str);
        return response.data
    };