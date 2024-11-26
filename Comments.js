// src\Components\DetailViewComponent\DetailViewComponent.js

// ~ Import react-redux hook
// ~ Import State and Async Function from redux-toolkit
// # Main Component
// & dispatch Variable
// / Get All Habits By User
// / Get Today Date
// / Get Todat Day
// * Handle Change Update WeekLog
// % Onchange Value
// % update habitDoneCount
// % Update WeekLog
// % updated Habit & dispatch
// # Detailview Component Render
// Filter logs for today

// src\Components\HabitHomeComponent\HabitHomeComponent.js

// ~ Styling
// ~ Import Toast from react-toastify
// ~ Redux Hook
// ~ Value For User State
// ~ import Value for Habit State and Async Func From Redux-toolkit
// # Main HabitHome Component Func
// & Dispatch Hook
// & Input Variable habitName
// / Get Current User State Value from Selector
// / Get All Habits State Value From Selector
// / Get All Habits By User
// / Get Current Habit
// % handle Show Form
// + Handle Add Form
// % If CurrentHabit Then Update
// % Habit Data Object
// + Add New Habit
// - Clear habitName Form
// * Handle Edit Btn
// - Handle Delete
// % If update btn clicked and current habit then mount old data
// # HabitHome Component Render

// src\Components\HomeComponent\HomeComponent.js

// ~ Styling
// ~ Toast Styling
// ~ BG Image
// ~ Home Page Img
// ~ Redux hook
// ~ Import Toolkit Selector and Function for Dispatch
// # Main Component Class Function
// & Dispatch Hook
// & UseRef Variable
// & Use Navigate
// $ Handle Submit Function
// # main Render Function

// src\Components\NavbarComponent\NavbarComponent.js

// ~ Import redux-hook
// ~ Import Routing from react-router0dom
// ~ Import User State
// ~ Import Toast from react-toastify
// # Navbar Main Function
// & useDispatch
// & navigate Variable
// & Get current User State
// $ handle Logout
// $ Redirect to home if the user logs out
// # Navbar Render Function

// src\Components\WeeklyDetailsComponent\WeeklyDetailComponent.js

// ~ Import redux-hook
// ~ Import habitState and Func From redux-toolkit
// # WeeklyDetailComponent Main Func
// & dispatch Variable
// / Get All Habits By User
// / Get Month Numeric Value For display So, creating monthMapping Array
// * Handle Change Update WeekLog
// * Update habitDoneCount
// * UpdateLog
// % dispatch updated habit with log
// # WeeklyDetailComponent Render Func

// src\Redux\HabitsToolkit.js

// ~ Import Functionalities from redux-toolkit
// ~ Import Toast from react-toastify
// & Initial State
// / Get today Date
// + Add New Habit with WeekLog
// / Get All Habaits From LocalStorage
// + Create Array for weekDays
// + Create NewHabitData Object
// % push new Habit in AllHabits State and set In localstorage
// / Filter AllHabits By User Created
// / Get All Habits
// / Get All Habits By User
// / Handle Edit
// / Get Habit Data
// * Update Habit By Id
// % Update in loaclstorage
// * Update Habit Log
// - Delete Habit
// - remove from Localstorage and set all Habit
// # Create Slice Function for habitsToolkit
// + Add New Habit
// / Get All Habits
// / Get All Habits By User
// / Get Habit By Id
// * Update Habit Data
// * Update Habit Log
// -Delete Habit
// % Show Add Habit Form
// & habitsReducer Variable
// & All Habits By User Variable
// & All Habits State Selector
// & Get CurrentHabit
// & Show Form Selector
// & Show Form Selector

// src\Redux\UserToolKit.js

// ~ Import Functionalities from redux-toolkit
// ~ Import Toast from react-toastify
// & Declare Initial State
// / Get UserName
// & Save User in Localstorage
// & Return the username
// / Get LoggedInUser Data From Localstorage
// % Set Current User
// - LogOut User Function
// # User Tool Kit Slice Function
// / Get User From Localstorage
// / Check Current User
// - Logout Function
// & User Reducer
// & User State Selector

// src\App.js

// ~ Import Functionalities from react-router-dom
// ~ Import React-reduc Hook
// ~ React NotificationComponent
// ~ Import All Components
// ~ Import Current State From redux-toolkit
// ~ Import Async Functions From redux-toolkit
// #  App Main Function
// & Declare Variable For Dispatch Hook
// & Declare Variable For Navigate
// & Declare Variable For Location to Get the current location
// & Declare Variable For User State
// / Get Name from localstorage
// / Check and Get Current User
// / Get All Habits
// / Get All Habits By User
// % Redirect to habithome if the user is logged in and not already on that page
// % Redirect to habithome
// # Main Render Function

// src\index.js

// ~ Main All Component
// ~ Import BrowserRouter For Routing From react-router-dom
// ~ Import Provider For rap App in Store
// ~ Import Store
