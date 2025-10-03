import React, { useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../../ToastMessages/errorMessage'
import { addTeamAPi } from '../../Api/TeamApi/addTeamApi'
import { handleSuccess } from '../../ToastMessages/successMessage'

export const CreateTeamPage = () => {

    const naviagte = useNavigate();

    const [projectTeam, setProjectTeam] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProjectTeam({
            ...projectTeam,
            [name]: value
        });
    };

    const handleToCreateTeamFormSubmission = async (e) => {
        e.preventDefault();

        const { name, description } = projectTeam;

        if(!name && !description) {
            handleError("Team name is required");
            return;
        };

        if(name && name.length < 5) {
            handleError("Team name must be greater than 5 characters.");
            return;
        };

        if(description && description.length < 10) {
            handleError("Team Description must be greater than 10 characters.");
            return;
        };

        try {
            const result = await addTeamAPi(projectTeam);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setProjectTeam({
                    name: "",
                    description: ""
                });
                setTimeout(() => {
                    naviagte(-1);
                }, 3000);
            }
            else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        }
    };


    return (
        <>
            <Layout>
                <Helmet>
                    <title>Create-Team | Workshana</title>
                    <meta name='description' content='Create Your Workshana Team...' />
                    <meta name='keywords' content='create Project, Create Team, Team, workshana, TaskManager' />
                </Helmet>

                <main className='container'>
                    <section className='row justify-content-center align-items-center min-vh-100'>
                        <div className="col-md-8 col-lg-5 py-3">
                            <form
                                className="p-4 border rounded shadow-lg bg-light border border-light"
                                onSubmit={handleToCreateTeamFormSubmission}
                            >
                                <h2 className="mb-4 text-center">Create Team</h2>
                                <hr />
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Team Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter Your Team Name"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={projectTeam.name}
                                    />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="des" className="form-label">
                                        Description
                                    </label>
                                    <textarea name="description" id="des" className='form-control' rows={5} placeholder='Enter Your Team Description' onChange={handleChange} value={projectTeam.description}></textarea>
                                </div>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Add Team
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
