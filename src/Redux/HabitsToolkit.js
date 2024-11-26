// ~ Import Functionalities from redux-toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ~ Import Toast from react-toastify
import { toast } from "react-toastify";

// & Initial State
const INITIAL_STATE = {
  habits: [],
  allHabitsByUser: null,
  currentHabit: null,
  addHabitForm: false,
};

// / Get today Date
const today = new Date();

// + Add New Habit with WeekLog
export const addNewHabitFunc = createAsyncThunk(
  "addNewHabit",
  async (newHabit) => {
    // / Get All Habaits From LocalStorage
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];

    // + Create Array for weekDays
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // + Create NewHabitData Object
    const newHabitData = {
      id: allHabits.length + 1,
      user: newHabit.user,
      habitName: newHabit.habitName,
      habitDoneCount: 0,
      weekLog: daysOfWeek.map((day, index) => ({
        id: index,
        day,
        dd: today.getDate() - index,
        mm: today.toLocaleString("default", { month: "long" }),
        yyyy: today.getFullYear(),
        isDone: "None",
      })),
    };
    // % push new Habit in AllHabits State and set In localstorage
    allHabits.push(newHabitData);
    localStorage.setItem("habits", JSON.stringify(allHabits));

    // / Filter AllHabits By User Created
    const habitsByUser = allHabits.filter(
      (habit) => habit.user === newHabitData.user
    );
    toast.success(`${newHabitData.habitName} new habit added successfully.`);
    return { newHabitData, habitsByUser };
  }
);

// / Get All Habits
export const getAllHabitsFun = createAsyncThunk("getAllHabits", async () => {
  const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
  return allHabits;
});

// / Get All Habits By User
export const getAllHabitsByUser = createAsyncThunk(
  "getAllHabitsByUser",
  async (user) => {
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitsByUser = allHabits.filter((habit) => habit.user === user);
    return habitsByUser;
  }
);

// / Handle Edit

export const showAddHabitForm = createAsyncThunk("getForm", async () => {
  return;
});

// / Get Habit Data
export const getHabitById = createAsyncThunk(
  "getHabitById",
  async (habitId) => {
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];

    const getHabit = allHabits.find((habit) => habit.id === habitId);

    return getHabit;
  }
);

// * Update Habit By Id
export const updateHabitFunc = createAsyncThunk(
  "updateHabit",
  async (habitData) => {
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitsByUser = allHabits.filter(
      (habit) => habit.user === habitData.user
    );
    const getHabit = allHabits.find((habit) => habit.id === habitData.id);
    getHabit.habitName = habitData.habitName;
    // % Update in loaclstorage
    localStorage.setItem("habits", JSON.stringify(allHabits));
    toast.success("Habit Updated Successfully");
    return { getHabit, allHabits, habitsByUser };
  }
);

// * Update Habit Log
export const updateWeekLogFunc = createAsyncThunk(
  "updateWeekLog",
  async (updatedHabit) => {
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitsByUser = allHabits.filter(
      (habit) => habit.user === updatedHabit.user
    );
    const getHabit = allHabits.find((habit) => habit.id === updatedHabit.id);
    if (getHabit) {
      getHabit.weekLog = updatedHabit.weekLog;

      getHabit.habitDoneCount = getHabit.weekLog.filter(
        (log) => log.isDone === "Done"
      ).length;
      localStorage.setItem("habits", JSON.stringify(allHabits));
    }
    toast.success("Updated in Habit WeekLog Successfully");
    return { allHabits, updatedHabit, habitsByUser };
  }
);

// - Delete Habit
export const deleteHabitFunc = createAsyncThunk(
  "deleteHabit",
  async (habitdelete) => {
    const allHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const getHabit = allHabits.find(
      (habit) => habit.id === habitdelete.habit.id
    );
    // - remove from Localstorage and set all Habit
    allHabits.splice(allHabits.indexOf(getHabit), 1);
    localStorage.setItem("habits", JSON.stringify(allHabits));

    const habitsByUser = allHabits.filter(
      (habit) => habit.user === habitdelete.currentUser
    );

    toast.error("Delete Habit Successfully");
    return { allHabits, habitsByUser };
  }
);

// # Create Slice Function for habitsToolkit
const habitsToolkit = createSlice({
  name: "habits",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    // + Add New Habit
    builder.addCase(addNewHabitFunc.fulfilled, (state, action) => {
      state.habits.push(action.payload.newHabitData);
      state.allHabitsByUser = action.payload.habitsByUser;
    });

    // / Get All Habits
    builder.addCase(getAllHabitsFun.fulfilled, (state, action) => {
      state.habits = action.payload;
    });

    // / Get All Habits By User
    builder.addCase(getAllHabitsByUser.fulfilled, (state, action) => {
      state.allHabitsByUser = action.payload;
    });

    // / Get Habit By Id
    builder.addCase(getHabitById.fulfilled, (state, action) => {
      state.currentHabit = action.payload;
    });

    // * Update Habit Data
    builder.addCase(updateHabitFunc.fulfilled, (state, action) => {
      state.currentHabit = action.payload.getHabit;
      state.habits = action.payload.allHabits;
      state.allHabitsByUser = action.payload.habitsByUser;
    });

    // * Update Habit Log
    builder.addCase(updateWeekLogFunc.fulfilled, (state, action) => {
      state.currentHabit = action.payload.getHabit;
      state.habits = action.payload.allHabits;
      state.allHabitsByUser = action.payload.habitsByUser;
    });

    // -Delete Habit
    builder.addCase(deleteHabitFunc.fulfilled, (state, action) => {
      state.habits = action.payload.allHabits;
      state.allHabitsByUser = action.payload.habitsByUser;
    });

    // % Show Add Habit Form
    builder.addCase(showAddHabitForm.fulfilled, (state, action) => {
      state.addHabitForm = true;
    });
  },
});

// & habitsReducer Variable
export const habitsReducer = habitsToolkit.reducer;

// & All Habits By User Variable
export const allHabitsByUserSelector = (state) =>
  state.habitsReducer.allHabitsByUser;

// & All Habits State Selector
export const habitsSelector = (state) => state.habitsReducer.habits;

// & Get CurrentHabit
export const currentHabitSelector = (state) => state.habitsReducer.currentHabit;

// & Show Form Selector
export const addHabitFormSelector = (state) => state.habitsReducer.addHabitForm;

// & Show Form Selector
export const isDoneCountSelector = (state) => state.habitsReducer.isDoneCount;
