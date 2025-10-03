import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Pencil, Trash2 } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { Helmet } from "react-helmet";
import { allTagApi } from '../../Api/TagApi/allTagApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { handleError } from '../../ToastMessages/errorMessage';
import { deleteTagApi } from '../../Api/TagApi/deleteTagApi';
import { useNavigate } from 'react-router-dom';

export const AllTagPage = () => {

    const navigate = useNavigate();

    const [tag, setTag] = useState([]);

    const fetchAllTag = async () => {
        try {
            const result = await allTagApi();
            const { success, message, error, data } = result;

            if (success) {
                handleSuccess(message);
                setTag(data);
            }
            else if (!success) {
                handleError(message);
                setTag([]);
            }
            else {
                handleError(error);
                setTag([]);
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };

    useEffect(() => {
        fetchAllTag();
    }, []);


    const handleUpdate = (id) => {
        if(id) {
            const decode = btoa(id);
            navigate(`/update-tag/${decode}`);
        };
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteTagApi(id);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                fetchAllTag();
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
        <>
            <Layout>
                <Helmet>
                    <title>All-Tag | Workshana</title>
                    <meta name='description' content="Display all the Tag data in this page." />
                    <meta name="keywords" content="All Tag Data, Display Tag Data, Tag " />
                </Helmet>

                <div className="container py-4">
                    <h1 className="text-center fw-bold mb-4 text-dark mb-3">
                        All Tag
                    </h1>
                    <hr />

                    {tag.length === 0 ? (
                        <p className="text-center text-muted d-flex justify-content-center align-items-center min-vh-100">
                            No Tag available
                        </p>
                    ) : (
                        <div className="row g-4 mt-3">
                            {tag.map((tag) => (
                                <div key={tag._id} className="col-md-6 col-lg-4">
                                    <div className="card shadow-sm border-0 h-100 d-flex flex-column">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-dark fw-bold pb-3">
                                                {tag.name}
                                            </h5>

                                            <hr />

                                            <div className="mt-auto d-flex justify-content-between">
                                                <button
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => handleUpdate(tag._id)}
                                                >
                                                    <Pencil size={16} className="me-1" />
                                                    Update
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(tag._id)}
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
    )
}
