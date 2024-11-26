import React from "react";

// ~ Import react-redux hook
import { useDispatch, useSelector } from "react-redux";

// ~ Import State and Async Function from redux-toolkit
import {
  allHabitsByUserSelector,
  updateWeekLogFunc,
} from "../../Redux/HabitsToolkit";

// # Main Component
const DetailViewComponent = () => {
  // & dispatch Variable
  const dispatch = useDispatch();

  // / Get All Habits By User
  const allHabitsByUser = useSelector(allHabitsByUserSelector);

  // / Get Today Date
  const today = new Date();
  // / Get Todat Day
  let day = today.getDate();

  // * Handle Change Update WeekLog
  const handleChange = (e, log, habit) => {
    e.preventDefault();

    // % Onchange Value
    const selectedValue = e.target.value;

    // % update habitDoneCount
    const updatedHabitDoneCount =
      selectedValue === "Done"
        ? habit.habitDoneCount + 1
        : selectedValue === "Not Done" && habit.habitDoneCount > 0
        ? habit.habitDoneCount - 1
        : habit.habitDoneCount;

    // % Update WeekLog
    const updatedLog = { ...log, isDone: selectedValue };

    // % updated Habit & dispatch
    const updatedHabit = {
      ...habit,
      habitDoneCount: updatedHabitDoneCount,
      weekLog: habit.weekLog.map((l) => (l.dd === log.dd ? updatedLog : l)),
    };

    dispatch(updateWeekLogFunc(updatedHabit));
  };

  // # Detailview Component Render
  return (
    <div className="container mt-3 ">
      {allHabitsByUser?.map((habit) => (
        <div
          key={habit.id}
          className="d-flex justify-content-between border border-primary rounded-3 p-3 my-2"
        >
          <h2>{habit.habitName}</h2>
          {habit.weekLog
            .filter((log) => log.dd === day) // Filter logs for today
            .map((log) => (
              <div key={log.dd} className="d-flex justify-content-between">
                <h4 className="me-5 d-flex justify-content-between text-primary">
                  Date:-{" "}
                  <span className="text-black me-5">
                    {log.dd}/{log.mm}/{log.yyyy}
                  </span>
                </h4>
                <h4 className="me-2">{log.day}</h4>
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
            ))}
        </div>
      ))}
    </div>
  );
};

export default DetailViewComponent;
