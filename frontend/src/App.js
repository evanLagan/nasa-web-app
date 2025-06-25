import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import APODDetailPage from './components/APODDetailPage';
import './App.css';

const App = () => {
  return (
    <div className="app-wraper">
      <div className="app-header">
       <h1>NASA APOD Calendar</h1>
      </div>
    <Routes>
      <Route path="/" element={<CalendarView />} />
      <Route path="/apod/:date" element={<APODDetailPage />} />
    </Routes>
    </div>
  );
};

export default App;
