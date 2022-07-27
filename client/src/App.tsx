import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Vehicles from './components/Vehicles';
import VehiclesDetails from './components/VehiclesDetails';
import Login from './components/Login';
import Panel from './components/Panel';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/vehicles" element = {<Vehicles/>}/>
        <Route path = "/vehicles/:idVehicle" element = {<VehiclesDetails/>}/>;
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin' element={<Login/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='panel' element={<Panel/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
