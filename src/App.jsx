import SignIn from "./component/SignIn/SignIn";
import Register from "./component/Register/Register";
import Dashboard from "./component/Dashboard/Dashboard";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Find_Donors from "./component/Dashboard/Find_Donors";
import All_Requests from "./component/Dashboard/All_Requests";
import Nearby_Requests from "./component/Dashboard/Nearby_Requests";
import Single_Request from "./component/Dashboard/Single_Request";
import Update_User from "./component/Dashboard/Update_User";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <>
      <Main>
        <Routes>
          <Route exact path="/" element={<SignIn setIsAuth={setIsAuth} />} />
          <Route
            exact
            path="/register"
            element={<Register isAuth={isAuth} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            exact
            path="/allrequests"
            isAuth={isAuth}
            element={<All_Requests />}
          />
          <Route exact path="/updateuser/:id" element={<Update_User />} />
          <Route exact path="/finddonors" element={<Find_Donors />} />
          <Route exact path="/nearbyrequests" element={<Nearby_Requests />} />
          <Route exact path="/singlerequest/:id" element={<Single_Request />} />
        </Routes>
      </Main>
    </>
  );
}
