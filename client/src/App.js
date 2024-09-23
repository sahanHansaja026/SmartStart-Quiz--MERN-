import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/add";
import Login from "./pages/login";
import Signup from "./pages/register";
import Create from "./pages/create_card";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NavBar from "./component/navbar";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Routes>
            <Route exact path="/" Component={Login}></Route>
            <Route exact path="/add/:id" Component={Add}></Route>
            <Route exact path="/Register" Component={Signup}></Route>
            <Route exact path="/create" Component={Create}></Route>
            <Route exact path="/home" Component={Home}></Route>
            <Route exact path="/profile" Component={Profile}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
