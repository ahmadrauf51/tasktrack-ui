import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ViewTaskModal = ({ isOpen, task, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
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
    }, [isOpen, onClose]);

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full"
            >
                <h3 className="text-lg font-bold mb-4">View Task</h3>
                <p><strong>Title:</strong> {task.title}</p>                
                <div className="mt-4">
                    <strong>Subtasks:</strong>
                    <ul className="list-disc pl-5 mt-2">
                        {task.subtasks && task.subtasks.length > 0 ? (
                            task.subtasks.map((subtask, index) => (
                                <li key={index} className="mb-1">
                                    {subtask.title}
                                </li>
                            ))
                        ) : (
                            <p>No subtasks available.</p>
                        )}
                    </ul>
                </div>
                
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewTaskModal;
