import React from 'react';
import CalendarView from './components/CalendarView';
import './App.css';

function App() {
  return(
    <div className='app-wrapper'>
      <h1 style={{ textAlign: 'center', margin: '1rem 0'}}>NASA Space Calendar</h1>
      <CalendarView />
    </div>
  );
}

export default App;
