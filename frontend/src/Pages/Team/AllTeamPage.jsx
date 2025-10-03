import React, { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../ToastMessages/errorMessage";
import { allTeamApi } from "../../Api/TeamApi/allTeamApi";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { deleteTeamApi } from "../../Api/TeamApi/deleteTeamApi";

export const AllTeamPage = () => {
    const navigate = useNavigate();

    const [team, setTeam] = useState([]);

    const fetchAllTeam = async () => {
        try {
            const result = await allTeamApi();
            const { success, message, error, data } = result;

            if (success) {
                handleSuccess(message);
                setTeam(data);
            } else if (!success) {
                handleError(message);
                setTeam([]);
            } else {
                handleError(error);
                setTeam([]);
            };
        } catch (error) {
            handleError(error.message);
        }
    };

    useEffect(() => {
        fetchAllTeam();
    }, []);

    const handleUpdate = (id) => {
        if(id) {
            const decode = btoa(id);
            navigate(`/update-team/${decode}`);
        };
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteTeamApi(id);
            const { success, message, error } = result;

            if(success) {
                handleSuccess(message);
                fetchAllTeam();
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

    return (
        <>
            <Layout>
                <Helmet>
                    <title>All-Team | Workshana</title>
                    <meta name='description' content="Display all the Team data in this page." />
                    <meta name="keywords" content="All Team Data, Display Team Data, Team " />
                </Helmet>

                <div className="container py-4">
                    <h1 className="text-center fw-bold mb-4 text-dark mb-3">
                        All Teams
                    </h1>
                    <hr />

                    {team.length === 0 ? (
                        <p className="text-center text-muted d-flex justify-content-center align-items-center min-vh-100">
                            No Team available
                        </p>
                    ) : (
                        <div className="row g-4 mt-3">
                            {team.map((team) => (
                                <div key={team._id} className="col-md-6 col-lg-4">
                                    <div className="card shadow-sm border-0 h-100 d-flex flex-column">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-dark fw-bold pb-3">
                                                {team.name}
                                            </h5>
                                            <p className="card-text text-secondary flex-grow-1">
                                                {team.description || "No description available"}
                                            </p>

                                            <hr />

                                            <div className="mt-auto d-flex justify-content-between">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => handleUpdate(team._id)}
                                                >
                                                    <Pencil size={16} className="me-1" />
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(team._id)}
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
        </>
    );
};
