import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCreateModal,
  setTitle,
  setDescription,
  setStatus,
  setShowTaskSelect,
  openCreateModal,
  setSelectedTask,
} from '../features/modal/modalCreateSlice';
import { createResource, getResources } from '../uttils/AxiosService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { updateTasksInList } from '../features/tasks/tasksSlice';
import { RxCross1 } from "react-icons/rx";


const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const { isOpen, title, description, status, showTaskSelect, parent_task_id } = useSelector(
    (state) => state.modalCreate
  );
  const tasks = useSelector((state) => state.tasks.tasks);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeCreateModal());
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
    const user_id = Cookies.get('user_id');
    const taskData = { user_id, title, description, status, parent_task_id: showTaskSelect ? parent_task_id : null };
    try {
      await createResource(taskData);
      const updatedTasks = await getResources();
      dispatch(updateTasksInList(updatedTasks.data));
      toast.success('Task created successfully!');
      dispatch(closeCreateModal());
    } catch (error) {
      toast.error('Error creating task.');
    }
  };

  return (
    <>
      <button
        onClick={() => dispatch(openCreateModal())}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Task
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div ref={modalRef} className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create Task</h3>
                <button
                  onClick={() => dispatch(closeCreateModal())}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
              <RxCross1/>
                </button>
              </div>
              <div className="p-6 space-y-6">
                {/* Form Inputs */}
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
                    value={status || ''}
                    onChange={(e) => dispatch(setStatus(e.target.value))}
                    className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                  >
                    <option value="" disabled>
                      Select your status
                    </option>
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
                      value={parent_task_id || ''}
                      onChange={(e) => dispatch(setSelectedTask(e.target.value))}
                      className="block w-full p-2.5 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                    >
                      <option value="" disabled>
                        Select a task
                      </option>
                      {tasks?.map((task) => (
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
                  Create
                </button>
                <button
                  onClick={() => dispatch(closeCreateModal())}
                  className="ml-3 text-gray-900 bg-white border rounded-lg px-5 py-2.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskModal;
