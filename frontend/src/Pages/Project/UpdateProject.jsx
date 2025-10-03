import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '../../ToastMessages/errorMessage';
import { projectDetails } from '../../Api/ProjectApi/projectDetails';
import { updateProjectApi } from '../../Api/ProjectApi/updateProject';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../../ToastMessages/successMessage';

export const UpdateProject = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    let encoded = null;
    if (id) {
        encoded = atob(id);
    };

    const [projectData, setProjectData] = useState({
        name: "",
        description: ""
    });

    const fetchDetaisByProjectId = async () => {
        try {
            const result = await projectDetails(encoded);
            const { success, message, error, data } = result;

            if (success) {
                setProjectData({
                    name: data.name,
                    description: data.description
                });
            }
            else if (!success) {
                handleError(message);
                setProjectData({
                    name: "",
                    description: ""
                });
            }
            else {
                handleError(error);
                setProjectData({
                    name: "",
                    description: ""
                });
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        fetchDetaisByProjectId();
    }, [id]);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProjectData({
            ...projectData,
            [name]: value
        });
    };

    const handleToUpdateProjectFormSubmission = async (e) => {
        e.preventDefault();

        const { name, description } = projectData;

        if(!name) {
            handleError("Project Name is required");
            return;
        };

        if (!name && !description) {
            handleError("Name field is required.");
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
            const result = await updateProjectApi(encoded, projectData);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setProjectData({
                    name: "",
                    description: ""
                });
                setTimeout(() => {
                    navigate(-1);
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
        <Layout>
            <Helmet>
                <title>Update-Project | Workshana</title>
                <meta name='description' content='Updatee Your Workshana Project...' />
                <meta name='keywords' content='Update Project, project, workshana, TaskManager' />
            </Helmet>

            <main className='container'>
                <section className='row justify-content-center align-items-center min-vh-100'>
                    <div className="col-md-8 col-lg-5 py-3">
                        <form
                            className="p-4 border rounded shadow-lg bg-light border border-light"
                            onSubmit={handleToUpdateProjectFormSubmission}
                        >
                            <h2 className="mb-4 text-center">Update Project</h2>
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
                                    value={projectData.name}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="des" className="form-label">
                                    Description
                                </label>
                                <textarea name="description" id="des" className='form-control' rows={5} placeholder='Enter Your Project Description' onChange={handleChange} value={projectData.description}></textarea>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-warning w-100">
                                    Update Project
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <ToastContainer />
            </main>
        </Layout>
    )
}
