import React from 'react';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Student Admission Form</h2>
        <StudentForm />
      </div>
    </div>
  );
}

export default App;
