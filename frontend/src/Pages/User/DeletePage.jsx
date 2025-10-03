import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { handleError } from "../../ToastMessages/errorMessage";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { allAuthContext } from "../../Context/Authcontext/Authcontext";
import { ToastContainer } from "react-toastify";
import { deleteApi } from "../../Api/UserApi/deleteApi";
import { Layout } from "../../Components/Layout/Layout";

export const DeletePage = () => {
  // context api call here
  const { removeUserDetailsFromLocalStorage } = allAuthContext();

  // navigation called
  const navigate = useNavigate();

  // use all useState
  const [showPassword, setShowPassword] = useState(false);

  const [deleteInfo, setDeleteInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDeleteInfo({
      ...deleteInfo,
      [name]: value,
    });
  };

  const handleDeleteFormSubmission = async (e) => {
    e.preventDefault();
    const { name, email, password } = deleteInfo;

    if (!name || !email || !password) {
      handleError("All fields are required.");
      return;
    };

    if (email && !email.includes("@")) {
      handleError("Invalid Email Address");
      return;
    };

    if (password.length < 8) {
      handleError("Password must be greater than 8 characters.");
      return;
    };

    try {
      const result = await deleteApi(deleteInfo);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        removeUserDetailsFromLocalStorage();
        setDeleteInfo({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/signup");
        }, 2000);
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
          <title>Delete | Workshana </title>
          <meta
            name="description"
            content="Delete your account on Workasana Account Data."
          />
          <meta
            name="keywords"
            content="Delete, Workasana"
          />
        </Helmet>

        <main className="container">
          <section className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 col-lg-4 py-3">
              <form
                className="p-4 border rounded shadow-lg bg-light border border-light"
                onSubmit={handleDeleteFormSubmission}
              >
                <h2 className="mb-4 text-center">Delete Account</h2>
                <hr />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                    className="form-control"
                    onChange={handleChange}
                    value={deleteInfo.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    onChange={handleChange}
                    value={deleteInfo.email}
                  />
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                      className="form-control"
                      onChange={handleChange}
                      value={deleteInfo.password}
                    />{" "}
                    <button
                      type="button"
                      className="btn btn-outline-secondary text-danger"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-danger w-100">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </section>
          <ToastContainer />
        </main>
      </Layout>
    </>
  );
};
