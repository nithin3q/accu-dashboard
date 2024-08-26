// src/App.js
import React from 'react';
import { WidgetProvider } from './context/WidgetContext';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar';
// import './App.css';


function App() {
  return (
    <WidgetProvider>
      <div className="App">
        <Topbar/>
        <Dashboard />

      </div>
    </WidgetProvider>
  );
}

export default App;
