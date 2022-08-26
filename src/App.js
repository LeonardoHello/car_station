import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Table from "./components/Table";
import Header from "./components/Header";
import CarInfo from "./components/CarInfo";

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
      <Route element={<Header brightness={brightness} setBrightness={setBrightness} />}>
        <Route path="/car-search" element={<Table brightness={brightness} />}/>
        {vehicleModel && (
          vehicleModel.map((elem, index) => <Route key={index} path={`/car-search/${elem.make}/${elem.name}`} element={
            <CarInfo 
              name={elem.name}
              make={elem.make}
              year={elem.year}
              price={elem.price}
              id={elem.id}
              makeId={elem.makeId} 
            />}
          />)
        )}
      </Route>
    </Routes>
  );
}

export default App;