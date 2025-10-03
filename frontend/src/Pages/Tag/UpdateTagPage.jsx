import React, { useEffect, useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../ToastMessages/errorMessage';
import { updateTagApi } from '../../Api/TagApi/updateTagApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { tagDetailsApi } from '../../Api/TagApi/tagDetailsApi';

export const UpdateTagPage = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    let encode = null;
    if (id) {
        encode = atob(id);
    };

    const [isFocused, setIsFocused] = useState(false);

    const [tag, setTag] = useState({
        name: ""
    });

    const fetchTagNameById = async () => {
        try {
            const result = await tagDetailsApi(encode);
            const { success, message, error, data } = result;

            if(success) {
                setTag({
                    name: data.name
                });
            }
            else if(!success) {
                setTag({
                    name: ""
                });
            }else {
                setTag({
                    name: ""
                });
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        fetchTagNameById();
    }, [id]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTag({
            ...tag,
            [name]: value
        });
    };

    const handleToUpdateTagFormSubmission = async (e) => {
        e.preventDefault();

        const { name } = tag;

        if (!name) {
            handleError("Tag Name is required");
            return;
        };

        if (name && name.length < 5) {
            handleError("Tag Name must be greater than 5 Characters");
            return;
        };

        try {
            const result = await updateTagApi(encode, tag);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTag({
                    name: ""
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
                <title>Update-Tag | Workshana</title>
                <meta name='description' content='Update Your Workshana Tag...' />
                <meta name='keywords' content='Update Project Tag, Update Tag, workshana, TaskManager' />
            </Helmet>

            <main className='container'>
                <section className='row justify-content-center align-items-center min-vh-100'>
                    <div className="col-md-8 col-lg-5 py-3">
                        <form
                            className="p-4 border rounded shadow-lg bg-light border border-light"
                            onSubmit={handleToUpdateTagFormSubmission}
                        >
                            <h2 className="mb-4 text-center">Update Tag</h2>
                            <hr />
                            <div className="mb-3 mt-4">
                                <label htmlFor="name" className="form-label">
                                    Tag Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Tag Name"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={tag.name}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    style={{
                                        boxShadow: isFocused ? 'inset 0 0 0 2px #0d6efd' : 'none',
                                        borderColor: isFocused ? '#0d6efd' : '#ced4da'
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary w-100">
                                    Update Tag
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
