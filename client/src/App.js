import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/add";
import Login from "./pages/login";
import Signup from "./pages/register";
import Create from "./pages/create_card";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route exact path="/" Component={Login}></Route>
            <Route exact path="/add" Component={Add}></Route>
            <Route exact path="/Register" Component={Signup}></Route>
            <Route exact path="/create" Component={Create}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
