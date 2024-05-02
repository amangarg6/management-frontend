import React, { useState, useEffect } from 'react';
import axiosInstance from './Interceptor';
import ApplyButton from './ApplyButton';


function Home() {
  const [userData, setUserData] = useState('');
  const [result, setResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(`https://localhost:44392/api/Apply/${searchTerm}`);
      const data = response.data;
      setResult(data);
      setFilteredResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log("Updated result:", filteredResults);
  }, [filteredResults]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserData(value);
    setSelectedCompany(null);

    handleSearch(value);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setUserData(company.name); // Set the input value to the selected company name

    // Filter out the selected company from the search results
    setFilteredResults((prevResults) => prevResults.filter((result) => result.id === company.id));
  };
  
  const handleApply = async () => {
    debugger
    try {
      // Ensure a company is selected
      if (!selectedCompany) {
        console.error('No company selected for applying.');
        return;
      }
  
      // Make the API call to create the invitation
      const requestData = {
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
        // Add more properties as needed
      };
  
      const response = await axiosInstance.post('https://localhost:44392/api/Apply', requestData);
  
      // Handle the API response
      console.log('Apply API Response:', response.data);
  
      // You can add further logic based on the API response, e.g., show a success message
    } catch (error) {
      console.error('Error applying:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userData}
        onChange={handleChange}
        placeholder="Search company"
      />

      <div className="search-results">
        <h2>Search Results:</h2>
        {filteredResults.map((company, index) => (
          <div
            key={index}
            className="company-item"
            onClick={() => handleCompanySelect(company)}
          >
            <p><strong>Company Name:</strong> {company.name}</p>
          </div>
        ))}
      </div>
      {selectedCompany && (
        <div>
          <h2>Selected Company Information:</h2>
          <p><strong>Company Name:</strong> {selectedCompany.name}</p>
          <button onClick={handleApply} style={{ marginTop: '10px' }}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
