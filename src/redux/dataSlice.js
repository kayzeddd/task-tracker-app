import { createSlice } from '@reduxjs/toolkit'

const setInitialState = () => {
    const storedData = localStorage.getItem('taskData');
    return storedData ? JSON.parse(storedData) : {
      today: [],
      "this-week": [],
      count: [],
      dates: [],
      "to-do": [],
      "check-in": {morning:"", night: ""},
      goals:"",
      rules:"",
    };
}

export const dataSlice = createSlice({
    name: "data",
    initialState: setInitialState()
    ,
    reducers:{
        addData: (state, action) => {
            state[action.payload.section] = [...state[action.payload.section], action.payload];
            localStorage.setItem('taskData', JSON.stringify(state));
          },
        removeData: (state, action) => {
            state[action.payload.section] = state[action.payload.section].filter(
                task => task.id !== action.payload.id
              );
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        updateData: (state, action) => {
            state[action.payload.section] = state[action.payload.section].map(task => {
                if(task.id === action.payload.id){                    
                    return action.payload
                }
                else{
                    return task
                }
            })
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        resetData: (state, action) => {
            state[action.payload.section] = state[action.payload.section].map(task => {
                return {...task, value: null, completed: false}
            })
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        addDates: (state, action) => {
            state.dates = [...action.payload]
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        addCheckIn: (state, action) => {
            state["check-in"] = {...state["check-in"], [action.payload.section]: action.payload.text};
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        addGoal: (state, action) => {
            state["goals"] = {text: action.payload.text};
            localStorage.setItem('taskData', JSON.stringify(state));
        },
        addRule: (state, action) => {
            state["rules"] = {text: action.payload.text};
            localStorage.setItem('taskData', JSON.stringify(state));
        },   
    }
})

export const { addData, removeData, updateData, resetData, addDates, addCheckIn, addGoal, addRule } = dataSlice.actions

export default dataSlice.reducer