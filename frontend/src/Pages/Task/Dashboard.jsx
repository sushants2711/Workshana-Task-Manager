import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from 'react-helmet';
import { handleError } from '../../ToastMessages/errorMessage';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { Pencil, Trash2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { allTaskContext } from '../../Context/Taskcontext/TaskContext';
import { useNavigate } from 'react-router-dom';
import { deleteTaskApi } from '../../Api/TaskApi/deleteTaskApi';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState([]);
    const { displayData, fetchAllTaskOnDashboard } = allTaskContext();
    const [loading, setLoading] = useState(false);

    const ftechAllTask = async () => {
        if(status && status.length > 0) {
            fetchAllTaskOnDashboard(status);
        }else{
            fetchAllTaskOnDashboard();
        };     
    };

    useEffect(() => {
        ftechAllTask();
    }, []);

    const handleStatus = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        if (selectedStatus && selectedStatus.length > 0) {
            fetchAllTaskOnDashboard(selectedStatus);
        } else {
            fetchAllTaskOnDashboard();
        };
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "To Do":
                return "bg-primary";
            case "In Progress":
                return "bg-info text-dark";
            case "Completed":
                return "bg-success-gradient";
            case "Blocked":
                return "bg-warning text-dark";
            default:
                return "bg-dark";
        };
    };

    const statusCounts = displayData?.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
    }, {});

    const handleNavigateToDetailsPage = (id) => {
        if (id) {
            const decode = btoa(id);
            navigate(`/details-task/${decode}`);
        };
    };

    const handleDelete = async (id) => {
        try {
            window.alert("Do you want to delete this item?");
            const result = await deleteTaskApi(id);
            const {success, message, error } = result;

            if(success) {
                handleSuccess(message);
                ftechAllTask();
            }
            else if(!success) {
                handleError(message);
            }
            else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    const handleUpdate = (id) => {
        if(id) {
            const decode = btoa(id);
            navigate(`/update-task/${decode}`);
        };
    };

    return (
        <>
            <style>{`
        /* 🔹 Status Badge Gradients */
        .bg-primary {
          background: linear-gradient(90deg, #007bff, #00c6ff);
          color: white !important;
        }

        .bg-info {
          background: linear-gradient(90deg, #17a2b8, #5ee7df);
          color: #0b0b0b !important;
        }

        .bg-success-gradient {
          background: linear-gradient(90deg, #28a745, #6dd47e);
          color: #fff !important;
        }

        .bg-warning {
          background: linear-gradient(90deg, #ffc107, #ffdf7e);
          color: #212529 !important;
        }

        .bg-dark {
          background-color: #343a40 !important;
          color: white !important;
        }

        /* 🔹 Glow Effect */
        .bg-primary,
        .bg-info,
        .bg-success-gradient,
        .bg-warning {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }

        /* 🔹 Card Hover Effect */
        .task-card {
          background: linear-gradient(180deg, #f9fbff 0%, #ffffff 100%);
          transition: all 0.3s ease-in-out;
        }

        .task-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        /* 🔹 Dropdown & Button Focus Effect */
        select:focus,
        button:focus {
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
        }
      `}</style>


            <Layout>
                <Helmet>
                    <title>All Tasks | Workshana</title>
                    <meta name="description" content="Display all project task data in this page." />
                    <meta name="keywords" content="All Project Task Data, Display Project Data, Project, Task Data, Task" />
                </Helmet>

                <div className="container py-5">

                    {/* Page Header */}
                    <div className="text-center mb-5">
                        <h1 className="fw-bold text-dark mb-2 display-6">
                            📋 Task Dashboard
                        </h1>
                        <p className="text-secondary fs-5">
                            Monitor and manage all your project tasks in one place.
                        </p>
                        <hr className="w-25 mx-auto border-3 border-primary opacity-75 rounded-pill" />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6">
                            <label htmlFor="sort" className="form-label fw-semibold text-dark">
                                Filter by Status
                            </label>
                            <select
                                id="sort"
                                className="form-select shadow-sm border-2 border-primary border-opacity-25 rounded-3 py-2"
                                onChange={handleStatus}
                                value={status}
                            >
                                <option value="">All</option>
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                    </div>

                    {/* Loader */}
                    {loading && (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <p className="mt-3 text-secondary fw-semibold">Loading tasks...</p>
                        </div>
                    )}

                    {/* No Data */}
                    {!loading && displayData.length === 0 && (
                        <div className="text-center py-5">
                            <p className="fs-5 text-muted">
                                🚫 No tasks found. Create a new one to get started!
                            </p>
                        </div>
                    )}

                    <div className="row mb-5 mt-5">
                        {statusCounts &&
                            Object.keys(statusCounts).map((curr) => (
                                <div key={curr} className="col-12 col-md-6 col-lg-3 mb-3">
                                    <div
                                        className={`card shadow-sm border-0 text-center text-white ${getStatusBadgeClass(
                                            curr
                                        )}`}
                                    >
                                        <div className="card-body py-3">
                                            <h6 className="fw-bold mb-1">{curr}</h6>
                                            <p className="mb-0">{statusCounts[curr]} Count</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Task Cards */}
                    <div className="row g-4">
                        {displayData.map((task) => (
                            <div
                                key={task._id}
                                className="col-sm-12 col-md-6 col-lg-4" style={{ cursor: "pointer"}}
                                onClick={() => handleNavigateToDetailsPage(task._id)}
                            >
                                <div
                                    className="card border-0 shadow-lg rounded-4 h-100 transition-all hover-shadow position-relative overflow-hidden task-card"
                                >
                                    <div className="card-body d-flex flex-column p-4">

                                        {/* Task Header */}
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="fw-bold text-primary text-capitalize">
                                                {task.name}
                                            </h5>
                                            <span
                                                className={`${getStatusBadgeClass(task.status)} px-3 py-2 rounded-pill fw-semibold shadow-sm`}
                                                style={{
                                                    fontSize: "0.8rem",
                                                    letterSpacing: "0.3px",
                                                }}
                                            >
                                                {task.status}
                                            </span>
                                        </div>

                                        {/* Task Meta Info */}
                                        <div className="mt-auto border-top pt-3">
                                            <p className="text-muted small mb-2">
                                                <strong>Created:</strong>{" "}
                                                {new Date(task.createdAt).toLocaleDateString()}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="d-flex justify-content-between align-items-center pt-2">
                                                <button
                                                    className="btn btn-sm btn-outline-warning d-flex align-items-center gap-1 px-3 rounded-pill shadow-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); 
                                                        handleUpdate(task._id);
                                                    }}>
                                                    <Pencil size={16} />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-3 rounded-pill shadow-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(task._id)
                                                    }}>
                                                    <Trash2 size={16} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ToastContainer limit={1} />
                </div>
            </Layout>
        </>
    );
};
