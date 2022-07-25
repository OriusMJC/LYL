import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/admin'>
          <Route path='login' element={<Login/>}/>
          <Route path='panel' element={<Panel/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
