import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import Card from "./components/Card"; // Create a Card component to display supplier information

const BASE_URL = "https://staging.iamdave.ai";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [channel, setChannel] = useState("");
  const [state, setState] = useState("");
  const [sort, setSort] = useState("");
  const [sortReverse, setSortReverse] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [channelOptions, setChannelOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/list/supply`, {
        params: {
          _page_number: page,
          category: category || undefined,
          channel: channel || undefined,
          state: state || undefined,
          _sort_by: sort || undefined,
          _sort_reverse: sortReverse || undefined,
        },
        headers: {
          "Content-Type": "application/json",
          "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
          "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
          "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
        },
      });

      const totalData = Math.floor(
        response.data.total_number / response.data.page_size
      );
      console.log(response.data);

      setSuppliers(response.data.data);
      setTotalPages(totalData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/unique/supply/category`, {
        headers: {
          "Content-Type": "application/json",
          "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
          "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
          "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
        },
      });

      // Assuming the response.data is an array of category options
      const categoryOptions = response.data.data;

      // Set the category options in the component's state
      setCategoryOptions(categoryOptions);
    } catch (error) {
      console.error("Error fetching category options:", error);
    }
  };

  const fetchChannelOptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/unique/supply/channel`, {
        headers: {
          "Content-Type": "application/json",
          "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
          "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
          "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
        },
      });

      // Assuming the response.data is an array of channel options
      const channelOptions = response.data.data;

      // Set the channel options in the component's state
      setChannelOptions(channelOptions);
    } catch (error) {
      console.error("Error fetching channel options:", error);
    }
  };

  const fetchStateOptions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/unique/supply/state`, {
        headers: {
          "Content-Type": "application/json",
          "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
          "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
          "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434",
        },
      });

      // Assuming the response.data is an array of state options
      const stateOptions = response.data.data;

      // Set the state options in the component's state
      setStateOptions(stateOptions);
    } catch (error) {
      console.error("Error fetching state options:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, category, channel, state, sort, sortReverse]);

  useEffect(() => {
    fetchCategoryOptions();
    fetchChannelOptions();
    fetchStateOptions();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSortReverseChange = () => {
    setSortReverse(!sortReverse);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "50px",
        }}
      >
        <FormControl variant='outlined' size='large' style={{ width: "200px" }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label='Category'
          >
            <MenuItem>All</MenuItem>
            {Object.keys(categoryOptions).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='large' style={{ width: "200px" }}>
          <InputLabel>Channel</InputLabel>
          <Select
            value={channel}
            onChange={handleChannelChange}
            label='Channel'
          >
            <MenuItem>All</MenuItem>
            {Object.keys(channelOptions)?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='large' style={{ width: "200px" }}>
          <InputLabel>State</InputLabel>
          <Select value={state} onChange={handleStateChange} label='State'>
            <MenuItem>All</MenuItem>
            {Object.keys(stateOptions)?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='large' style={{ width: "200px" }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sort} onChange={handleSortChange} label='Sort By'>
            <MenuItem value='None'>None</MenuItem>
            <MenuItem value='source_time'>Source Time</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={sortReverse}
              onChange={handleSortReverseChange}
            />
          }
          label='Reverse Sort'
        />
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "40px",
              color: "#fff",
            }}
          >
            {suppliers.map((supplier) => (
              <Card key={supplier.source_id} data={supplier} />
            ))}
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            size='large'
          />
        </>
      )}
    </Box>
  );
};

export default SupplierList;
