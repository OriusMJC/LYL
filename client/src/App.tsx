import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Nav from './components/Nav';
import Vehicles from './components/Vehicles';
import VehiclesDetails from './components/VehiclesDetails';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/vehicles" element = {<Vehicles/>}/>
        <Route path = "/vehicles/:idVehicle" element = {<VehiclesDetails/>}/>;
      </Routes>
    </div>
  );
}

export default App;
