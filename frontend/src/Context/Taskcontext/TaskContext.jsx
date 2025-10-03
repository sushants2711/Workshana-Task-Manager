import React, { createContext, useContext, useState } from 'react'
import { handleError } from '../../ToastMessages/errorMessage';
import { allTaskApi } from '../../Api/TaskApi/allTaskApi';
import { handleSuccess } from '../../ToastMessages/successMessage';

export const TaskContext = createContext();

export const allTaskContext = () => useContext(TaskContext);

export const TaskContextProvider = ({ children }) => {
    const [displayData, setDisplayData] = useState([]);

    const fetchAllTaskOnDashboard = async (status) => {
        try {
            let result = null;

            if (status) {
                result = await allTaskApi(status);
            } else {
                result = await allTaskApi();
            };

            const { success, message, error, data } = result;

            if (success) {
                handleSuccess(message);
                setDisplayData(data);
            }
            else if (!success) {
                handleError(message);
                setDisplayData([]);
            }
            else {
                handleError(error);
                setDisplayData([]);
            };
        } catch (error) {
            handleError(error.message);
        };
    };
    return (
        <TaskContext.Provider value={{ displayData, setDisplayData, fetchAllTaskOnDashboard }}>
            {children}
        </TaskContext.Provider>
    )
}
