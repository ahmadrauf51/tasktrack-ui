import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    editingTask: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { index, task } = action.payload;
      state.tasks[index] = task;
    },
    updateTasksInList: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
    clearEditingTask: (state) => {
      state.editingTask = null;
    },
  },
});

export const {
  updateTasksInList,
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setEditingTask,
  clearEditingTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
