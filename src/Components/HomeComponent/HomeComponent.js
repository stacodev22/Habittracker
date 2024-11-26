import React, { useRef } from "react";

// ~ Styling
import "./Home.css";

// ~ Toast Styling
import { toast } from "react-toastify";

// ~ BG Image
import bgImage from "../../images/homepageImage.jpg";

// ~ Home Page Img
import homeImg from "../../images/welcomePng.png";

// ~ Redux hook
import { useDispatch, useSelector } from "react-redux";

// ~ Import Toolkit Selector and Function for Dispatch
import { getUser, userSelector } from "../../Redux/UserToolKit";
import { useNavigate } from "react-router-dom";

// # Main Component Class Function
const HomeComponent = () => {
  // & Dispatch Hook
  const dispatch = useDispatch();

  // & UseRef Variable
  const userInputName = useRef();

  // & Use Navigate
  const navigate = useNavigate();

  const currentUser = useSelector(userSelector);

  // $ Handle Submit Function
  const handleFormSubmit = () => {
    const name = userInputName.current.value.trim();
    if (name === "") {
      toast.error("Please enter Your Name");
    }

    dispatch(getUser(name));
    navigate("/habithome");
  };

  // # main Render Function
  return (
    <>
      {!currentUser && (
        <div className="container-fluid text-center">
          <div className="card border-0">
            <img
              src={bgImage}
              className="card-img-bottom img-fluid imageContent"
              alt="Homepage"
            />
            <div className="card-body card-img-overlay d-flex flex-column justify-content-center">
              <h1>Welcome To Habits Tracker</h1>
              <img
                src={homeImg}
                className="card-img-top w-25 mx-auto"
                alt="homeImg"
              />
              <p className="card-text">
                As long as habit and routine dictate the pattern of living, new
                dimensions of the soul will not emerge.
              </p>

              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Let's Begin
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Please Enter Your Name
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="input-group mb-3">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa-solid fa-user"></i>
                          </span>
                          <input
                            type="text"
                            name="userName"
                            ref={userInputName}
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={handleFormSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeComponent;
