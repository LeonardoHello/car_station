import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Table from "./components/Table";
import AppLayout from "./components/AppLayout";
import CarInfo from "./components/CarInfo";
import EditCar from "./components/EditCar";
import CreateCar from "./components/CreateCar";

const App = () => {
  const [brightness, setBrightness] = useState(true);
  const [vehicleModel, setVehicleModel] = useState();
  const [vehicleMake, setVehicleMake] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleMake",
      params: {
        rpp: 1000
      },
    }).then(res => setVehicleMake(res.data.item))
    .catch(err => console.error(err));

    axios({
      method: "get",
      url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
      params: {
        rpp: 1000
      }
    }).then(res => setVehicleModel(res.data.item))
    .catch(err => console.error(err));
  }, [])

  return (
    <Routes>
      <Route element={<AppLayout brightness={brightness} setBrightness={setBrightness} />}>
        <Route path="" element={
          <Table 
            brightness={brightness} 
            vehicleModel={vehicleModel}  
            vehicleMake={vehicleMake}
            setVehicleMake={setVehicleMake} 
          />}
        />
        <Route path={`:id`} element={<CarInfo brightness={brightness} />}/>
        <Route path={`:id/edit`} element={<EditCar brightness={brightness} />}/>
        <Route path="create" element={
          <CreateCar 
            brightness={brightness} 
            vehicleMake={vehicleMake}
            setVehicleMake={setVehicleMake}
            setVehicleModel={setVehicleModel}
          />} 
        />
      </Route>
    </Routes>
  );
}

export default App;