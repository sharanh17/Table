import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data; ${response.status}`);
      }
  
      const data = await response.json();
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const pageData = data.slice(startIndex, endIndex);
  
      setEmployees(pageData);
      setTotalPages(Math.ceil(data.length / 10));
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to fetch data. Please try again.");
    }
  };
  

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchData(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h3>Employee Data Table</h3>
      <div>
        <table>
          <thead>
            <tr className="head">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                {/* Add more table data cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="button"
        >
          Previous
        </button>
        <span>{` ${currentPage} `}</span>
        <button
          className="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
