import { createSlice } from '@reduxjs/toolkit';

const modalEditSlice = createSlice({
    name: 'modalEdit',
    initialState: {
        isOpen: false,
        editingTask: null,
        title: '',
        description: '',
        status: '',
        showTaskSelect: false,
        parent_task_id: '',
        id:''
    },
    reducers: {
        openEditModal: (state) => {
            state.isOpen = true;
        },
        closeEditModal: (state) => {
            state.isOpen = false;
            state.editingTask = null;
        },
        setEditingTask: (state, action) => {
            state.editingTask = action.payload;
            
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
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
    openEditModal,
    closeEditModal,
    setEditingTask,
    setTitle,
    setDescription,
    setStatus,
    setShowTaskSelect,
    setSelectedTask,
    setId,
} = modalEditSlice.actions;

export default modalEditSlice.reducer;
