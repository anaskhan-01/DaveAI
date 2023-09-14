import { Box } from "@mui/material";
import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import CardUI from "./components/Card";
import SupplierList from "./SuplierList";

const customHeader = {
  "Content-Type": "application/json",
  "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
  "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
  "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
};

const BASE_URL = "https://staging.iamdave.ai";

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiData = await axios({
          url: `${BASE_URL}/list/supply?_page_number=1`,
          method: "get",
          headers: customHeader,
        });
        setData(apiData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box
      sx={{
        width: "1440px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SupplierList />
    </Box>
  );
}

export default App;
