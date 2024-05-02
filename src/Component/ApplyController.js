import React, { useEffect, useState } from 'react';

const ApplyController = () => {
  const [invitations, setInvitations] = useState([]);
  const [status, setStatus] = useState(0);

  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  useEffect(() => {
    // Fetch invitations
    const fetchInvitations = async () => {
      try {
        const response = await fetch('https://localhost:44392/api/Apply/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setInvitations(data);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, [token]);

  const handleStatusUpdate = async (reciverId, newStatus) => {
    try {
      const response = await fetch(`https://localhost:44392/api/Apply/${reciverId}/${newStatus}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.Status === 1) {
        // Successfully updated status, you can update your local state accordingly
        setStatus(newStatus);
      } else {
        console.error('Error updating status:', result.Message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      {/* Render your invitations here */}
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.reciverId}>
            {invitation.reciverId} - {invitation.status}
            <button onClick={() => handleStatusUpdate(invitation.reciverId, 1)}>
              Approve
            </button>
            <button onClick={() => handleStatusUpdate(invitation.reciverId, 2)}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplyController;
