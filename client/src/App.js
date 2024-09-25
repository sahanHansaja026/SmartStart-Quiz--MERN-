import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Add from "./pages/add";
import Login from "./pages/login";
import Signup from "./pages/register";
import Create from "./pages/create_card";
import Home from "./pages/home";
import Profile from "./pages/profile";
import QuizCard from "./pages/quizcard";
import NavBar from "./component/navbar";
import Quiz from "./pages/quiz";
import ScorePage from "./pages/score";
import CurdsPage from "./pages/curd";
import EditPost from "./pages/editquestion";
import QuestionDeatails from "./pages/questionDeatails";

const App = () => {
  const location = useLocation();

  // Define the paths where the NavBar should not be shown
  const noNavBarPaths = ["/", "/register"];

  return (
    <div className="container">
      {!noNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/add/:id" element={<Add />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/quiz/:card_id" element={<Quiz />} />
        <Route path="/curds/:id" element={<CurdsPage />} />
        <Route path="score/:card_id" element={<ScorePage/>}/>
        <Route path="/post/:id" element={<QuizCard />} />
        <Route path="/edit/:id"element={<EditPost/>}/>
        <Route path="/getquestion/:id"element={<QuestionDeatails/>}/>

      </Routes>
    </div>
  );
};

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
