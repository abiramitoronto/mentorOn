import React, { useState } from "react";
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Switch,
  useHistory
} from "react-router-dom";
import './App.css';
import useApplicationData from "./hooks/useApplicationData";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Mentors from "./components/Mentors/Mentors";
import Bookmentor from "./components/Mentors/Bookmentor";
import { Dashboard } from "./components/Dashboard";

export default function App(props) {

  const history = useHistory();

  (function (d, m) {
    var kommunicateSettings =
      { "appId": "3866cee3cfb0ba5975ff20d53893db8f6", "popupWidget": true, "automaticChatOpenOnNavigation": true };
    var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
    window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});

  let userExists; try {
    userExists = JSON.parse(localStorage.getItem('user'))
  } catch (err) {
    console.error(err);
  };

  function logOut() {
    localStorage.clear()
    setUser(null)
    history.replace('/')
  };

  const [user, setUser] = useState(userExists);

  const {
    state
  } = useApplicationData();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar logOut={logOut} user={user} />
        <div className="page-content">
          {/* <Fragment> */}
          <Switch>
            <Route exact="true" path="/" component={Home} />
            <Route path="/login" render={(props) => <Login {...props} user={user} setUser={setUser} />} />
            <Route path="/mentors" render={props => <Mentors data={state} user={user} />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/bookmentor" component={Bookmentor} />
          </Switch>
          {/* </Fragment> */}
        </div>
      </BrowserRouter>
    </div>
  );
};
