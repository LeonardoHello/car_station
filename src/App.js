import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Table from "./components/Table";
import Header from "./components/Header";
import CarInfo from "./components/CarInfo";
import EditCarInfo from "./components/EditCarInfo";

const App = () => {
  const [brightness, setBrightness] = useState(true);
  const [vehicleModel, setVehicleModel] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.baasic.com/beta/simple-vehicle-app/resources/VehicleModel",
      params: {
        rpp: 1000
      },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => setVehicleModel(res.data.item))
    .catch(err => console.error(err));
  }, [])

  return (
    <Routes>
      <Route path="/car-search" element={<Header brightness={brightness} setBrightness={setBrightness} />}>
        <Route path="" element={<Table brightness={brightness} vehicleModel={vehicleModel} />}/>
        {vehicleModel && (
          vehicleModel.map((elem, index) => <Route key={index} path={`${elem.make}/${elem.name}`} element={
            <CarInfo 
              name={elem.name.split('-').join(' ')}
              make={elem.make.split('-').join(' ')}
              year={elem.year}
              price={elem.price}
              brightness={brightness}
            />}
          />)
        )}
        {vehicleModel && (
          vehicleModel.map((elem, index) => <Route key={index} path={`${elem.make}/${elem.name}/edit`} element={
            <EditCarInfo 
              name={elem.name}
              make={elem.make}
              year={elem.year}
              price={elem.price}
              id={elem.id}
              brightness={brightness}
            />}
          />)
        )}
      </Route>
    </Routes>
  );
}

export default App;