import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Table from "./components/Table";
import Header from "./components/Header";
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
      <Route element={<Header brightness={brightness} setBrightness={setBrightness} />}>
        <Route path="/" element={
            <Table 
              brightness={brightness} 
              vehicleModel={vehicleModel}  
              vehicleMake={vehicleMake}
              setVehicleMake={setVehicleMake} 
            />
          }
        />
        {vehicleModel && (
          vehicleModel.map((elem, index) => <Route key={index} path={`/${elem.make}/${elem.name}`} element={
            <CarInfo 
              name={elem.name.replace(/-+/g, ' ')}
              make={elem.make.replace(/-+/g, ' ')}
              year={elem.year}
              price={elem.price}
              brightness={brightness}
            />}
          />)
        )}
        {vehicleModel && (
          vehicleModel.map((elem, index) => <Route key={index} path={`/${elem.make}/${elem.name}/edit`} element={
            <EditCar 
              name={elem.name}
              make={elem.make}
              year={elem.year}
              price={elem.price}
              id={elem.id}
              brightness={brightness}
              setVehicleModel={setVehicleModel}
            />}
          />)
        )}
        <Route path="/create" element={
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