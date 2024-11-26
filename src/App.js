import React, { useEffect } from "react";

//~ Styling
import "./App.css";

// ~ Import Functionalities from react-router-dom
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// ~ Import React-reduc Hook
import { useDispatch, useSelector } from "react-redux";

// ~ React NotificationComponent
import "react-notifications-component/dist/theme.css";
import "react-toastify/dist/ReactToastify.css";

// ~ Import All Components
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import HomeComponent from "./Components/HomeComponent/HomeComponent";
import HabitHomeComponent from "./Components/HabitHomeComponent/HabitHomeComponent";
import DetailViewComponent from "./Components/DetailViewComponent/DetailViewComponent";
import WeeklyDetailComponent from "./Components/WeeklyDetailsComponent/WeeklyDetailComponent";
import NotFoundComponent from "./Components/NotFoundComponent/NotFoundComponent";

// ~ Import Current State From redux-toolkit
import { checkCurrentUser, userSelector } from "./Redux/UserToolKit";

// ~ Import Async Functions From redux-toolkit
import { getAllHabitsByUser, getAllHabitsFun } from "./Redux/HabitsToolkit";

// #  App Main Function
const App = () => {
  // & Declare Variable For Dispatch Hook
  const dispatch = useDispatch();

  // & Declare Variable For Navigate
  const navigate = useNavigate();

  // & Declare Variable For Location to Get the current location
  const location = useLocation();

  // & Declare Variable For User State
  const currentUser = useSelector(userSelector);

  // / Get Name from localstorage
  useEffect(() => {
    // / Check and Get Current User
    dispatch(checkCurrentUser());
    // / Get All Habits
    dispatch(getAllHabitsFun());
    // / Get All Habits By User
    dispatch(getAllHabitsByUser(currentUser));
  }, [currentUser, dispatch]);

  // % Redirect to habithome if the user is logged in and not already on that page
  useEffect(() => {
    // % Redirect to habithome
    if (currentUser && location.pathname === "/") {
      navigate("/habithome");
    }
  }, [currentUser, navigate, location.pathname]);

  // # Main Render Function
  return (
    <Routes>
      <Route path="/" element={<NavbarComponent />}>
        {currentUser === null ? (
          <Route index element={<HomeComponent />} />
        ) : (
          <>
            <Route path="/habithome" element={<HabitHomeComponent />} />
            <Route path="/detailview" element={<DetailViewComponent />} />
            <Route path="/weeklyview" element={<WeeklyDetailComponent />} />
          </>
        )}
        <Route path="*" element={<NotFoundComponent />} />
      </Route>
    </Routes>
  );
};

export default App;
