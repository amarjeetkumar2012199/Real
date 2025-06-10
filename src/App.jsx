import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import AdmissionForm from "./AdmissionForm";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Protected Route */}
        <Route 
          path="/form" 
          element={isLoggedIn ? <AdmissionForm /> : <Navigate to="/" />} 
        />
        
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} 
        />
        
      </Routes>
    </Router>
  );
}

export default App;
