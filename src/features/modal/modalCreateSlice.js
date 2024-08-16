import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  description: "",
  status: "",
  showTaskSelect: false,
  parent_task_id: null,
};

const modalCreateSlice = createSlice({
  name: "modalCreate",
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isOpen = true;
    },
    closeCreateModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.description = "";
      state.status = "";
      state.showTaskSelect = false;
      state.parent_task_id = null;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setShowTaskSelect: (state, action) => {
      state.showTaskSelect = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.parent_task_id = action.payload;
    },
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  setTitle,
  setDescription,
  setStatus,
  setShowTaskSelect,
  setSelectedTask,
} = modalCreateSlice.actions;

export default modalCreateSlice.reducer;
