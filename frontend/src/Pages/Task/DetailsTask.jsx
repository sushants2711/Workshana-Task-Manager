import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleError } from '../../ToastMessages/errorMessage';
import { detailsTaskApi } from '../../Api/TaskApi/detailsTaskApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { Layout } from '../../Components/Layout/Layout';

export const DetailsTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const encode = id ? atob(id) : null;

  const fetchDetailsByIdOfTaskApi = async () => {
    try {
      const result = await detailsTaskApi(encode);
      const { success, message, error, data } = result;

      if (success) {
        handleSuccess(message);
        setTask(data);
      } else if (!success) {
        handleError(message);
        setTask({});
      } else {
        handleError(error);
        setTask({});
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    fetchDetailsByIdOfTaskApi();
  }, [id]);

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
    }
  };

  return (
    <Layout>
      <div className="container my-4">
        <h2 className="mb-4">Task Details</h2>

        {task && task._id ? (
          <div className="accordion" id="taskAccordion">

            {/* Task Main Info */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMain">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMain">
                  Task Info
                </button>
              </h2>
              <div id="collapseMain" className="accordion-collapse collapse show" data-bs-parent="#taskAccordion">
                <div className="accordion-body">
                  <p><strong>Name:</strong> {task.name}</p>
                  <p><strong>Status:</strong> <span className={getStatusBadgeClass(task.status)}>{task.status}</span></p>
                  <p><strong>Time to Complete:</strong> {task.timeToComplete} hrs</p>
                  <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
                  <p><strong>Task Id:</strong> {task._id}</p>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingProject">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProject">
                  Project Info
                </button>
              </h2>
              <div id="collapseProject" className="accordion-collapse collapse" data-bs-parent="#taskAccordion">
                <div className="accordion-body">
                  <p><strong>Name:</strong> {task.project?.name}</p>
                  <p><strong>Description:</strong> {task.project?.description}</p>
                  <p><strong>Project Id:</strong> {task.project?._id}</p>
                </div>
              </div>
            </div>

            {/* Team Info */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTeam">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTeam">
                  Team Info
                </button>
              </h2>
              <div id="collapseTeam" className="accordion-collapse collapse" data-bs-parent="#taskAccordion">
                <div className="accordion-body">
                  <p><strong>Name:</strong> {task.team?.name}</p>
                  <p><strong>Description:</strong> {task.team?.description}</p>
                  <p><strong>Team Id:</strong> {task.team?._id}</p>
                </div>
              </div>
            </div>

            {/* Owners & Tags */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOwners">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOwners">
                  Owners & Tags
                </button>
              </h2>
              <div id="collapseOwners" className="accordion-collapse collapse" data-bs-parent="#taskAccordion">
                <div className="accordion-body">
                  <p><strong>Owners:</strong></p>
                  <ol>
                    {task.owners?.map((owner) => (
                      <li key={owner._id}>
                        {owner.name} - {owner.email}
                      </li>
                    ))}
                  </ol>
                  <p>
                    <strong>Tags:</strong>{" "}
                    {task.tags?.map(tag => <span key={tag} className="badge bg-info me-1">{tag}</span>)}
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <p className="text-muted">Loading task details...</p>
        )}

      </div>
    </Layout>
  );
};
