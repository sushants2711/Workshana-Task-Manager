import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Helmet } from "react-helmet";
import { allTaskContext } from "../../Context/Taskcontext/TaskContext";
import { getAllTaskFilterAPI } from "../../Api/TaskApi/allTaskApi";
import { handleError } from "../../ToastMessages/errorMessage";
import { ToastContainer } from "react-toastify";

export const AllTaskPage = () => {
  const { displayData, setDisplayData, fetchAllTaskOnDashboard } = allTaskContext();
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    setLoading(true);
    await fetchAllTaskOnDashboard();
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchTask();
  // }, []);

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

    const [searchState, setSearchState] = useState({
      status: "",
      name: "",
      timeToComplete: ""
    });

    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setSearchState({
        ...searchState,
        [name]: value
      });
    };

const fetchFilteredTasks = async () => {
 
  if (
    searchState.name.length > 0 ||
    searchState.status.length > 0 ||
    searchState.timeToComplete.length > 0
  ) {
    try {
      const result = await getAllTaskFilterAPI(searchState);
      const { success, data, message, error } = result;

      if (success) {
        setDisplayData(data);
      } else if (!success) {
        setDisplayData([]);
        console.error(message);
      } else {
        setDisplayData([]);
        console.error(error);
      }
    } catch (err) {
      handleError(err.message);
    };
  } else {
    fetchTask();
  }
};

useEffect(() => {
  fetchFilteredTasks();
}, [searchState]);

console.log(searchState);
  return (
    <Layout>
      <Helmet>
        <title>All Tasks | Workshana - Task Management</title>
        <meta
          name="description"
          content="Track all tasks across projects and teams. Workshana helps you stay organized and productive with task statuses and filters."
        />
        <meta
          name="keywords"
          content="Workshana, task management, productivity, to do, in progress, completed, blocked"
        />
    
      </Helmet>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <p className="text-primary fw-bold fs-4">Loading Tasks...</p>
        </div>
      ) : (
        <div className="container mt-4 mb-5">
          <h2 className="text-center mb-4 fw-bold text-primary">
            📋 All Tasks Dashboard
          </h2>

        
          <div className="card shadow-sm border-0 mb-3 p-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="🔍 Search tasks by name, project..."
              className="form-control form-control-lg shadow-sm"
            />
          </div>

        
          <div className="card shadow-sm border-0 mb-4 p-4">
            <div className="row g-3 align-items-center">
              {/* 🔽 Status Filter */}
              <div className="col-md-6 col-sm-12">
                <select className="form-select shadow-sm" name="status" onChange={handleChange} value={searchState.status}>
                  <option value="">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

             
              <div className="col-md-6 col-sm-12 text-center text-md-start">
                <label className="me-2 fw-semibold">Sort by Time:</label>
                <input type="radio" name="timeToComplete" id="asc" value="asc" onChange={handleChange}/>
                <label htmlFor="asc" className="me-3 ms-1">Asc</label>
                <input type="radio" name="timeToComplete" id="dsc" value="dsc" onChange={handleChange}/>
                <label htmlFor="dsc" className="ms-1">Dsc</label>
              </div>
            </div>
          </div>

        
          <div className="row">
            {displayData && displayData.length > 0 ? (
              displayData.map((task, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark mb-2">
                        {task.name}
                      </h5>

                      
                      <p className="mb-1">
                        <strong>Status:</strong>{" "}
                       <span className="">
                          {task.status}
                        </span>
                      </p>

                      
                      <p className="mb-1">
                        <strong>Project:</strong>{" "}
                        {task.project?.name || "N/A"}
                      </p>

                     
                      <p className="mb-1">
                        <strong>Team:</strong> {task.team?.name || "N/A"}
                      </p>

                     
                      <p className="mb-1">
                        <strong>Time to Complete:</strong>{" "}
                        {task.timeToComplete} days
                      </p>

                      
                      <div className="mt-3">
                        <p className="fw-semibold mb-2">Tags:</p>
                        {Array.isArray(task.tags) && task.tags.length > 0 ? (
                          task.tags.map((tag, i) => (
                            <span key={i} className="badge bg-secondary me-2 mb-1">
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">No tags</span>
                        )}
                      </div>

                     
                      <div className="mt-3">
                        <p className="fw-semibold mb-2">Owners:</p>
                        {Array.isArray(task.owners) && task.owners.length > 0 ? (
                          <ul className="list-group list-group-flush">
                            {task.owners.map((owner, i) => (
                              <li key={i} className="list-group-item">
                                👤 {owner.name} <br />
                                <small className="text-muted">{owner.email}</small>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted">No owners assigned</p>
                        )}
                      </div>

                    
                      <p className="text-muted mt-3 mb-0">
                        <small>
                          🕒 Created At:{" "}
                          {new Date(task.createdAt).toLocaleString()}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted fs-5 mt-4">
                No tasks available
              </p>
            )}
          </div>
        </div>
      )}

<ToastContainer limit={1} />
    </Layout>
  );
};
