import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Table from "./components/Table";
import AppLayout from "./components/AppLayout";
import CarInfo from "./components/CarInfo";
import EditCar from "./components/EditCar";
import CreateCar from "./components/CreateCar";

const App = () => {
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
      <Route element={<AppLayout />}>
        <Route path="" element={<Table />}/>
        <Route path={`:id`} element={<CarInfo />}/>
        <Route path={`:id/edit`} element={<EditCar />}/>
        <Route path="create" element={
          <CreateCar 
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