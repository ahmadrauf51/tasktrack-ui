import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { deleteTask, setTasks } from '../features/tasks/tasksSlice';
import CreateTaskModal from "../components/CreateTaskModal";
import ViewTaskModal from "../components/ViewTaskModal";
import toast from 'react-hot-toast';
import { IoEyeSharp } from "react-icons/io5";
import { getResources, deleteResource , logoutUser} from '../uttils/AxiosService';
import EditTaskModal from '../components/EditTaskModal';
import { openEditModal, setEditingTask,setId } from '../features/modal/modalEditSlice';
import { CiLogout } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";
import { Oval } from 'react-loader-spinner'


export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.tasks);
    const isEditModalOpen = useSelector((state) => state.modalEdit.isOpen);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewTask, setViewTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const tasksData = await getResources();
                dispatch(setTasks(Array.isArray(tasksData) ? tasksData : tasksData.data));
                setIsLoading(false);

            } catch (error) {
                if (error.response?.status === 500) {
                    console.error('Server Error:', error.response.data);
                    toast.error('Server is currently unavailable. Please try again later.');
                } else {
                    console.error('Failed to fetch tasks:', error);
                    toast.error('Failed to load tasks. Please check your connection.');
                }
            }
        };

        fetchTasks();
    }, [dispatch]);

    const handleDeleteTask = async (index) => {
        try {
            const taskId = tasks[index].id;
            await deleteResource(taskId);
            dispatch(deleteTask(index));
            toast.success('Deleted successfully!');
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('Failed to delete task');
        }
    };

    const handleEditTask = (task) => {
        dispatch(setEditingTask(task));
        dispatch(setId(task.id));
        dispatch(openEditModal());
    };

    const handleViewTask = (task) => {
        setViewTask(task);
        setIsViewModalOpen(true);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
                dispatch(logout());
                toast.success('Logged out successfully!');
                navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('Failed to log out. Please try again.');
        }
    };
    

    return (
        <div>

<div className="flex justify-center items-center min-h-screen absolute top-0 left-0 right-0 bottom-0">
    {isLoading && (
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#9790fc"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    )}
  </div>

            <div className='flex relative justify-end items-center mr-10 mt-5 gap-5'>
                <CreateTaskModal />
                <button
                    onClick={handleLogout}
                    className=" text-black px-4 py-2 rounded hover:bg-slate-400	"
                >
                    <CiLogout />
                </button>
            </div>

            {Array.isArray(tasks) && tasks.length > 0 ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mx-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">No.</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(tasks) && tasks.map((task, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </td>
                                <td scope="row" className="px-6 py-4">
                                    {task.title}
                                </td>
                                <td className="px-6 py-4">{task.status}</td>
                                <td className="px-6 py-4">{task.description}</td>
                                <td className="px-6 py-4 flex space-x-4">
                                    <button
                                        onClick={() => handleViewTask(task)}
                                        className="text-green-600 dark:text-blue-500 hover:underline"
                                    >
                                        <IoEyeSharp />
                                    </button>
                                    <button
                                        onClick={() => handleEditTask(task)}
                                        className="text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <CiEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(index)}
                                        className="text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (<h2 className='text-center'>No Data Found</h2>)}

            <ViewTaskModal
                isOpen={isViewModalOpen}
                task={viewTask}
                onClose={() => setIsViewModalOpen(false)}
            />
            {isEditModalOpen && <EditTaskModal />}
        </div>
    );
};
