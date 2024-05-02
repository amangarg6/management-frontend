// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInEmployeeId, setLoggedInEmployeeId] = useState(/* Your logic to get the logged-in employee ID */);

  return (
    <AuthContext.Provider value={{ loggedInEmployeeId, setLoggedInEmployeeId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
