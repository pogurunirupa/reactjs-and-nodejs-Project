
import './App.css';
import React, { useState, useEffect } from 'react';

import { Table, InputGroup, FormControl, Dropdown, DropdownButton, Pagination } from 'react-bootstrap';
// const axios = require('axios');
// import axios from 'axios';


import dataObj from '../src/db.json'
function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);


  useEffect(() => {
  //   axios.get(dataObj.data)
  //     .then(response => setData(response.data))
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);
  setData(dataObj.data)
})
  // Filter data based on searchQuery
  const filteredData = data.filter(record =>
    record.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort data based on sortOption
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (sortOption === 'date') {
      return dateA - dateB;
    } else if (sortOption === 'time') {
      return dateA.getTime() - dateB.getTime();
    }

    return 0;
  });

  // Calculate pagination variables
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App container">
      <div className='parent'>
      <div className="m-3 p-2">
        <InputGroup>
        <label>Search: </label>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </div>
    <div className='m-3 p-2'>
        <label>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>
      </div>
      {/* <div className="mb-2">
        <DropdownButton title={`Sort by ${sortOption}`}>
          <Dropdown.Item onClick={() => setSortOption('date')}>Date</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption('time')}>Time</Dropdown.Item>
        </DropdownButton>
      </div> */}
      <Table striped bordered hover width="100%">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record,i) => (
            <tr key={record.sno}>
              <td>{i+1}</td>
              <td>{record.customer_name}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{new Date(record.created_at).toLocaleDateString()}</td>
              <td>{new Date(record.created_at).toLocaleTimeString()}</td>
            </tr>
          
          ))}
        </tbody>

      </Table>
      {/* Pagination */}
      
      <div>
        <Pagination className="demo">
          {[ ...Array(Math.ceil(sortedData.length / recordsPerPage)).keys()].map(number => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number +1)}
              className = "demo-box"
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default App;
