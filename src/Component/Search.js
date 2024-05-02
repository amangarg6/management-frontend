import axios from 'axios';
import React, { useState } from 'react'

function Search() {
    const [userData, setUserData] = useState('');
    const [result, setResult] = useState(null);
  
    const handleSearch = async () => {
      try {
        const response = await axios('https://localhost:44392/api/user/Search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={userData}
          onChange={(e) => setUserData(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
  
        {result && (
          <div>
            <h2>Company Information:</h2>
            <p><strong>Company Name:</strong> {result.companyName}</p>
            <p><strong>Address:</strong> {result.address}</p>
            {/* Add more properties as needed */}
          </div>
        )}
      </div>
    );
  };
  
export default Search