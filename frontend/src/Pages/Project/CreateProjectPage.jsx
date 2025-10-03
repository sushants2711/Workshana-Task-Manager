import React, { useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Helmet } from 'react-helmet'
import { handleError } from '../../ToastMessages/errorMessage';
import { createProjectApi } from '../../Api/ProjectApi/createProject';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const CreateProjectPage = () => {

  const navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProject({
      ...project,
      [name]: value
    });
  };

  const handleCreateProjectFormSubmission = async (e) => {
    e.preventDefault();

    const { name, description } = project;

    if (!name && !description) {
      handleError("Project Name is required");
      return;
    };

    if (name && name.length < 5) {
      handleError("Project Name must be Greater than 5 characters.");
      return;
    };

    if (description && description.length < 10) {
      handleError("Project Description at least 10 Characters");
      return;
    };

    try {
      const result = await createProjectApi(project);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setProject({
          name: "",
          description: ""
        });
        setTimeout(() => {
          navigate("/all-project");
        }, 3000);
      }
      else if (!success) {
        handleError(message);
      }
      else {
        handleError(error);
      };
    } catch (error) {
      handleError(error.message);
    };
  };


  return (
    <>
      <Layout>
        <Helmet>
          <title>Create-Project | Workshana</title>
          <meta name='description' content='Create Your Workshana Project...' />
          <meta name='keywords' content='create Project, project, workshana, TaskManager' />
        </Helmet>

        <main className='container'>
          <section className='row justify-content-center align-items-center min-vh-100'>
            <div className="col-md-8 col-lg-5 py-3">
              <form
                className="p-4 border rounded shadow-lg bg-light border border-light"
                onSubmit={handleCreateProjectFormSubmission}
              >
                <h2 className="mb-4 text-center">Create Project</h2>
                <hr />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Project Name"
                    className="form-control"
                    onChange={handleChange}
                    value={project.name}
                  />

                </div>
                <div className="mb-3">
                  <label htmlFor="des" className="form-label">
                    Description
                  </label>
                  <textarea name="description" id="des" className='form-control' rows={5} placeholder='Enter Your Project Description' onChange={handleChange} value={project.description}></textarea>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Add Project
                  </button>
                </div>
              </form>
            </div>
          </section>
          <ToastContainer />
        </main>
      </Layout>
    </>
  )
}
