import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { handleError } from "../../ToastMessages/errorMessage";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { allProjectApi } from "../../Api/ProjectApi/allProject";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProjectApi } from "../../Api/ProjectApi/deleteProject";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const AllProjectPage = () => {

  const navigate = useNavigate();

  const [project, setProject] = useState([]);

  const fetchAllProject = async () => {
    try {
      const result = await allProjectApi();
      const { success, message, error, data } = result;

      if (success) {
        handleSuccess(message);
        setProject(data);
      } else if (!success) {
        handleError(message);
        setProject([]);
      } else {
        handleError(error);
        setProject([]);
      };
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  const handleUpdate = (id) => {
    if (id) {
      const decode = btoa(id);
      navigate(`/update-project/${decode}`);
    };
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteProjectApi(id);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        fetchAllProject();
      } else if (!success) {
        handleError(message);
      } else {
        handleError(error);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  return (
    <Layout>
      <Helmet>
        <title>All-Project | Workshana</title>
        <meta name='description' content="Display all the Project data in this page." />
        <meta name="keywords" content="All Project Data, Display Project Data, Project " />
      </Helmet>

      <div className="container py-4">
        <h1 className="text-center fw-bold mb-4 text-dark mb-3">All Projects</h1>
        <hr />

        {project.length === 0 ? (
          <p className="text-center text-muted d-flex justify-content-center align-items-center min-vh-100">No projects available</p>
        ) : (
          <div className="row g-4 mt-3">
            {project.map((proj) => (
              <div key={proj._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark fw-bold pb-3">{proj.name}</h5>
                    <p className="card-text text-secondary flex-grow-1">
                      {proj.description || "No description available"}
                    </p>

                    <p className="text-muted small">
                      <strong>Created At:</strong>{" "}
                      {new Date(proj.createdAt).toLocaleDateString()}
                    </p>

                    <hr />

                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleUpdate(proj._id)}
                      >
                        <Pencil size={16} className="me-1" />
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(proj._id)}
                      >
                        <Trash2 size={16} className="me-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer limit={1} />
      </div>
    </Layout>
  );
};
