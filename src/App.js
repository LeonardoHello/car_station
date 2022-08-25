import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import Header from "./components/Header";

const App = () => {
  const [brightness, setBrightness] = useState(true);
  return (
    <Routes>
      <Route element={<Header brightness={brightness} setBrightness={setBrightness}/>}>
        <Route path="/" element={<Table brightness={brightness}/>} />
      </Route>
    </Routes>
  );
}

export default App;