import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import modalCreateReducer from '../features/modal/modalCreateSlice';
import modalEditReducer from '../features/modal/modalEditSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    modalCreate: modalCreateReducer,
    modalEdit: modalEditReducer,
  },
});

