import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserReport from './pages/UserReport';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserReport />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
