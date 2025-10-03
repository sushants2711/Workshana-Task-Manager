import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../../ToastMessages/errorMessage';
import { teamDetailsApi } from '../../Api/TeamApi/teamDetailsApi';
import { updateTeamApi } from '../../Api/TeamApi/updateTeamApi';
import { handleSuccess } from '../../ToastMessages/successMessage';

export const UpdateTeamPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    let encode = null;
    if (id) {
        encode = atob(id);
    };

    const [team, setTeam] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTeam({
            ...team,
            [name]: value
        });
    };

    const fetchTeamById = async () => {
        try {
            const result = await teamDetailsApi(encode);
            const { success, message, error, data } = result;

            if (success) {
                setTeam({
                    name: data.name,
                    description: data.description
                });
            }
            else if (!success) {
                handleError(message);
                setTeam({
                    name: "",
                    description: ""
                });
            }
            else {
                handleError(error);
                setTeam({
                    name: "",
                    description: ""
                });
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        fetchTeamById();
    }, [id]);

    const handleToUpdateTeamFormSubmission = async (e) => {
        e.preventDefault();

        const { name, description } = team;

        if(!name) {
            handleError("Team Name is required");
            return;
        };

        if (!name && !description) {
            handleError("Team Name is required.");
            return;
        };

        if (name && name.length < 5) {
            handleError("Team name must be Greater than 5 characters.");
            return;
        };

        if (description && description.length < 10) {
            handleError("Team Description at least 10 Characters")
            return;
        }
        try {
            const result = await updateTeamApi(encode, team);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTeam({
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
                <title>Update-Team | Workshana</title>
                <meta name='description' content='Updatee Your Workshana Team...' />
                <meta name='keywords' content='Update Project Team, project Team, workshana, TaskManager' />
            </Helmet>

            <main className='container'>
                <section className='row justify-content-center align-items-center min-vh-100'>
                    <div className="col-md-8 col-lg-5 py-3">
                        <form
                            className="p-4 border rounded shadow-lg bg-light border border-light"
                            onSubmit={handleToUpdateTeamFormSubmission}
                        >
                            <h2 className="mb-4 text-center">Update Team</h2>
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
                                    value={team.name}
                                />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="des" className="form-label">
                                    Description
                                </label>
                                <textarea name="description" id="des" className='form-control' rows={5} placeholder='Enter Your Team Description' onChange={handleChange} value={team.description}></textarea>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className="btn btn-warning w-100">
                                    Update Team
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
