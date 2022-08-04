import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Vehicles from './components/Vehicles';
import VehiclesDetails from './components/VehiclesDetails';
import Login from './components/Login';
import Panel from './components/Panel';
import Contact from './components/Contact';
import About from './components/About';
import EditVehicle from './components/EditVehicle';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/vehicles" element = {<Vehicles/>}/>
        <Route path = "/vehicles/:idVehicle" element = {<VehiclesDetails/>}/>;
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin'>
          <Route path='login' element={<Login/>}/>
          <Route path='panel' element={<Panel/>}/>
        </Route>
        <Route path = '/vehicles/edit/:idVehicle' element = {<EditVehicle/>}/>
      </Routes>
    </div>
  );
}

export default App;
