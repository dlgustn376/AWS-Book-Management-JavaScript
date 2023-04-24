import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import Callback from "./Study/Callback";
// import PromiseStudy from "./Study/PromiseStudy";
import Main from "./Pages/Main/Main";
import AuthRouteReactQuery from './components/Routes/AuthRoute/AuthRouteReactQuery';

function App() {

  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/login" element={ <AuthRouteReactQuery path="/login" element={<Login/>} /> }/>
        <Route path="/register" element={<AuthRouteReactQuery path="/register" element={<Register/>} />}/>
        <Route path="/" element={<AuthRouteReactQuery path="/" element={<Main />} />}/>
        <Route path="/admin/search" element={<AuthRouteReactQuery path="/" element={<Main />} />}/>
        
        {/* <Route path="/promise" Component={PromiseStudy}></Route>
        <Route path="/callback" Component={Callback}></Route> */}
      </Routes>
    </>    
  );
}

export default App;
