import React, { useEffect, useRef } from "react";

// ~ Styling
import "./HabitHome.css";

// ~ Import Toast from react-toastify
import { toast } from "react-toastify";

// ~ Redux Hook
import { useDispatch, useSelector } from "react-redux";

// ~ Value For User State
import { userSelector } from "../../Redux/UserToolKit";

// ~ import Value for Habit State and Async Func From Redux-toolkit
import {
  addNewHabitFunc,
  allHabitsByUserSelector,
  currentHabitSelector,
  deleteHabitFunc,
  getHabitById,
  habitsSelector,
  showAddHabitForm,
  updateHabitFunc,
} from "../../Redux/HabitsToolkit";

// # Main HabitHome Component Func
const HabitHomeComponent = () => {
  // & Dispatch Hook
  const dispatch = useDispatch();

  // & Input Variable habitName
  const newHabitInput = useRef();

  // / Get Current User State Value from Selector
  const currentUser = useSelector(userSelector);

  // / Get All Habits State Value From Selector
  const allHabits = useSelector(habitsSelector);

  // / Get All Habits By User
  const allHabitsByUser = useSelector(allHabitsByUserSelector);

  // / Get Current Habit
  const currentHabit = useSelector(currentHabitSelector);

  // % handle Show Form
  const handleShowForm = () => {
    dispatch(showAddHabitForm());
  };

  // + Handle Add Form
  const handleAddHabitForm = () => {
    const newHabitText = newHabitInput.current.value.trim();
    if (newHabitText === " ") {
      toast.error("Please Fill Data");
    }
    // % If CurrentHabit Then Update
    if (currentHabit) {
      const findIndex = allHabits.findIndex(
        (habit) => currentHabit.id === habit.id
      );
      // % Habit Data Object
      const habitData = {
        id: currentHabit.id,
        habitName: newHabitText,
        findIndex: findIndex,
        user: currentUser,
      };
      dispatch(updateHabitFunc(habitData));
    } else {
      // + Add New Habit
      const newHabit = {
        habitName: newHabitText,
        user: currentUser,
      };
      dispatch(addNewHabitFunc(newHabit));
    }
    // - Clear habitName Form
    newHabitInput.current.value = "";
  };

  // * Handle Edit Btn
  const handleEditHabit = (editHabit) => {
    dispatch(getHabitById(editHabit.id));
    dispatch(showAddHabitForm());
  };

  // - Handle Delete
  const handledelete = (habit) => {
    const habitDeleteData = {
      habit,
      currentUser,
    };
    dispatch(deleteHabitFunc(habitDeleteData));
  };

  // % If update btn clicked and current habit then mount old data
  useEffect(() => {
    if (currentHabit) {
      newHabitInput.current.value = currentHabit?.habitName;
    }
  }, [currentHabit, currentUser, dispatch]);

  // # HabitHome Component Render
  return (
    <div className="container-fluid bg-dark habitHomePage">
      <div className="container py-3">
        <h3 className="text-white">
          Welcome <span className="text-success">{currentUser}</span>
        </h3>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleShowForm}
          >
            Add New Habit
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add New Habit
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
                      <i className="fa-solid fa-notes-medical"></i>
                    </span>
                    <input
                      type="text"
                      name="userName"
                      ref={newHabitInput}
                      className="form-control"
                      placeholder="New Habit"
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
                    onClick={handleAddHabitForm}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-3">
          {allHabitsByUser?.map((habit) => (
            <div className="text-white" key={habit.id}>
              <div className="card text-center mb-2">
                <div className="card-header">
                  <p className="text-danger fw-bold">Habit No - {habit.id}</p>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h3
                      className="card-title text-success fw-bold text-start"
                      // onClick={() => handleDetailView(habit)}
                    >
                      {habit.habitName}
                    </h3>
                    <div className="me-3">
                      <button
                        type="button"
                        className="btn btn-success me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleEditHabit(habit)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handledelete(habit)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-body-secondary">
                  <p className="card-text text-dark fw-bolder fs-5">
                    Habit Completed in last week -{" "}
                    <span className="text-danger fs-5 fw-bold">
                      {habit.habitDoneCount} / 7{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitHomeComponent;
