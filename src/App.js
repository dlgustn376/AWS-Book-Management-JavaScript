import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import Callback from "./Study/Callback";
// import PromiseStudy from "./Study/PromiseStudy";
import Main from "./Pages/Main/Main";
import AuthRoute from "./components/Routes/AuthRoute/AuthRoute";
import { useRecoilValue } from "recoil";
import { authenticated } from "./index";

function App() {
  

  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={
          <AuthRoute authenticated={useRecoilValue(authenticated)} element={<Main />} 
          />}/>
        
        {/* <Route path="/promise" Component={PromiseStudy}></Route>
        <Route path="/callback" Component={Callback}></Route> */}
      </Routes>
    </>    
  );
}

export default App;
