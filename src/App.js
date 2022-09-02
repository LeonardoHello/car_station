import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Table from "./components/Table";
import CarInfo from "./components/CarInfo";
import EditCar from "./components/EditCar";
import CreateCar from "./components/CreateCar";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<Table />}/>
        <Route path=":id" element={<CarInfo />}/>
        <Route path=":id/edit" element={<EditCar />}/>
        <Route path="create" element={<CreateCar />}/>
      </Route>
    </Routes>
  );
}

export default App