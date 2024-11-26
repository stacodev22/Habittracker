import React from "react";

// ~ Import redux-hook
import { useDispatch, useSelector } from "react-redux";

// ~ Import habitState and Func From redux-toolkit
import {
  allHabitsByUserSelector,
  updateWeekLogFunc,
} from "../../Redux/HabitsToolkit";

// # WeeklyDetailComponent Main Func
const WeeklyDetailComponent = () => {
  // & dispatch Variable
  const dispatch = useDispatch();

  // / Get All Habits By User
  const allHabitsByUser = useSelector(allHabitsByUserSelector);

  // / Get Month Numeric Value For display So, creating monthMapping Array
  const monthMapping = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  // * Handle Change Update WeekLog
  const handleChange = (e, log, habit) => {
    e.preventDefault();
    const selectedValue = e.target.value;

    // * Update habitDoneCount
    const updatedHabitDoneCount =
      selectedValue === "Done"
        ? habit.habitDoneCount + 1
        : selectedValue === "Not Done" && habit.habitDoneCount > 0
        ? habit.habitDoneCount - 1
        : habit.habitDoneCount;

    // * UpdateLog
    const updatedLog = { ...log, isDone: selectedValue };

    // % dispatch updated habit with log
    const updatedHabit = {
      ...habit,
      habitDoneCount: updatedHabitDoneCount,
      weekLog: habit.weekLog.map((l) => (l.dd === log.dd ? updatedLog : l)),
    };
    dispatch(updateWeekLogFunc(updatedHabit));
  };

  // # WeeklyDetailComponent Render Func
  return (
    <div className="container mt-3">
      {allHabitsByUser?.map((habit) => (
        <div
          key={habit.id}
          className="d-flex flex-column justify-content-between border border-primary rounded-3 p-3 my-2"
        >
          <h2 className="border-bottom">{habit.habitName}</h2>
          <div className="card-group">
            {habit.weekLog.map((log) => (
              <div
                className="card border border-success rounded-4 text-center me-3"
                key={log.dd}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    Date{" "}
                    <span className="text-black">
                      {log.dd}/{monthMapping[log.mm]}/{log.yyyy}
                    </span>
                  </h5>
                  <div className="card-text">
                    <h5 className="text-bg-primary px-2">{log.day}</h5>
                  </div>

                  <div className="">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={log.isDone}
                      onChange={(e) => handleChange(e, log, habit)}
                    >
                      <option value="None">None</option>
                      <option value="Done">Done</option>
                      <option value="Not Done">Not Done</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyDetailComponent;
