import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Callback from "./Study/Callback";
import PromiseStudy from "./Study/PromiseStudy";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" Component={Login}></Route>
        <Route path="/register" Component={Register}></Route>
        <Route path="/promise" Component={PromiseStudy}></Route>
        <Route path="/callback" Component={Callback}></Route>
      </Routes>
    </>    
  );
}

export default App;
