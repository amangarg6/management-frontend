import React, { useState } from 'react';
import axios from 'axios';

const ApplyButton = ({ companyId, companyName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendInvitation = () => {
    setIsLoading(true);
    debugger;

    const requestData = {
      companyId: companyId,
      companyName: companyName,
     
    };

    axios.post('https://localhost:44392/api/Apply', requestData)
      .then(response => {
        console.log(response.data);
        // Handle success if needed
      })
      .catch(error => {
        console.error('Error:', error);
        setError(`Failed to send invitation. ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <button onClick={sendInvitation} disabled={isLoading}>
        {isLoading ? 'Sending Invitation...' : 'Send Invitation'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ApplyButton;
