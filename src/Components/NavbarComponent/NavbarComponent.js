import React, { useEffect } from "react";

// ~ Import redux-hook
import { useDispatch, useSelector } from "react-redux";

// ~ Import Routing from react-router0dom
import { Link, Outlet, useNavigate } from "react-router-dom";

// ~ Import User State
import { logOutFunction, userSelector } from "../../Redux/UserToolKit";

// ~ Import Toast from react-toastify
import { ToastContainer } from "react-toastify";

// # Navbar Main Function
const NavbarComponent = () => {
  // & useDispatch
  const dispatch = useDispatch();

  // & navigate Variable
  const navigate = useNavigate();

  // & Get current User State
  const currentUser = useSelector(userSelector);

  // $ handle Logout
  const handleLogout = () => {
    dispatch(logOutFunction());
    navigate("/");
  };

  // $ Redirect to home if the user logs out
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // # Navbar Render Function
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Stacodev Habit Tracer App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {currentUser ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/habithome"
                    >
                      Habit Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/detailview"
                    >
                      Detail View
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/weeklyview"
                    >
                      Weekly View
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-warning"
                      aria-current="page"
                      to="/"
                    >
                      {currentUser}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="/"
                    >
                      <i
                        className="fa-solid fa-right-from-bracket fs-3 text-danger"
                        onClick={handleLogout}
                      ></i>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">
                    Home
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <Outlet />
    </div>
  );
};

export default NavbarComponent;
