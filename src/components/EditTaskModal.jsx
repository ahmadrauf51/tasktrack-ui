import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    openEditModal,
    closeEditModal,
    setTitle,
    setDescription,
    setStatus,
    setShowTaskSelect,
    setSelectedTask,
} from '../features/modal/modalEditSlice';
import { getResources, updateResource } from '../uttils/AxiosService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { updateTasksInList } from '../features/tasks/tasksSlice';
import { RxCross1 } from "react-icons/rx";

const EditTaskModal = () => {
    const dispatch = useDispatch();
    const {id, isOpen, title, description, status, showTaskSelect, parent_task_id, editingTask } = useSelector(
        (state) => state.modalEdit
    );
    const user_id = Cookies.get('user_id');
    const modalRef = useRef(null);

    const tasks = useSelector((state) => state.tasks.tasks);
const filteredTasks = tasks.filter(item => item.id !== id);


    useEffect(() => {
        if (editingTask) {
            dispatch(setTitle(editingTask.title));
            dispatch(setDescription(editingTask.description));
            dispatch(setStatus(editingTask.status));
        }
    }, [dispatch, editingTask]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                dispatch(closeEditModal());
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, dispatch]);

    const handleSave = async () => {
        const taskData = { title, user_id, description, status, parent_task_id: showTaskSelect ? parent_task_id : null };

        try {
            await updateResource(editingTask.id, taskData);
            toast.success('Task updated successfully!');
            const updatedTasks = await getResources();
            dispatch(updateTasksInList(updatedTasks.data));
            dispatch(closeEditModal());
        } catch (error) {
            toast.error('Error updating task.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div ref={modalRef} className="relative p-4 w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</h3>
                        <button
                            onClick={() => dispatch(closeEditModal())}
                            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                        >
                            <RxCross1 />
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => dispatch(setTitle(e.target.value))}
                                className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                                placeholder="Task Title"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => dispatch(setDescription(e.target.value))}
                                className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                                placeholder="Task Description"
                            ></textarea>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <select
                                value={status}
                                onChange={(e) => dispatch(setStatus(e.target.value))}
                                className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                            >
                                <option value="ToDo">To Do</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add To Sub Task</label>
                            <input
                                type="checkbox"
                                checked={showTaskSelect}
                                onChange={() => dispatch(setShowTaskSelect(!showTaskSelect))}
                            />
                        </div>
                        {showTaskSelect && (
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Task</label>
                                <select
                                    value={parent_task_id}
                                    onChange={(e) => dispatch(setSelectedTask(e.target.value))}
                                    className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                                >
                                    <option value="" disabled>
                                        Select a task
                                    </option>
                                    {filteredTasks?.map((task) => (
                                        <option key={task.id} value={task.id}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end p-4 border-t dark:border-gray-600">
                        <button
                            onClick={handleSave}
                            className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => dispatch(closeEditModal())}
                            className="ml-3 text-gray-900 bg-white border rounded-lg px-5 py-2.5"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;
