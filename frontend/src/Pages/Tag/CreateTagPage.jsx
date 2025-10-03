import React, { useState } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { Helmet } from 'react-helmet'
import { handleError } from '../../ToastMessages/errorMessage';
import { ToastContainer } from 'react-toastify';
import { addTagApi } from '../../Api/TagApi/addTagApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { useNavigate } from 'react-router-dom';

export const CreateTagPage = () => {

    const navigate = useNavigate();

    const [tag, setTag] = useState({
        name: ""
    });

    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setTag({
            ...tag,
            [name]: value
        });
    };

    const handleCreateTagFormSubmission = async (e) => {
        e.preventDefault();

        const { name } = tag;

        if (!name) {
            handleError("Tag Name is required");
            return;
        };

        if (name && name.length < 5) {
            handleError("Tag Name must be graeter than 5 Characters");
            return;
        };

        try {
            const result = await addTagApi(tag);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTag({
                    name: ""
                });
                setTimeout(() => {
                    navigate("/all-tag");
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
                    <title>Create-Tag | Workshana</title>
                    <meta name='description' content='Create Your Workshana Tag...' />
                    <meta name='keywords' content='create Project Tag, Create Tag, workshana, TaskManager' />
                </Helmet>

                <main className='container'>
                    <section className='row justify-content-center align-items-center min-vh-100'>
                        <div className="col-md-8 col-lg-5 py-3">
                            <form
                                className="p-4 border rounded shadow-lg bg-light border border-light"
                                onSubmit={handleCreateTagFormSubmission}
                            >
                                <h2 className="mb-4 text-center">Create Tag</h2>
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
                                        Add Tag
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
