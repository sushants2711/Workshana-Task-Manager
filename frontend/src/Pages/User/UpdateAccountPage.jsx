import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { handleError } from "../../ToastMessages/errorMessage";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { allAuthContext } from "../../Context/Authcontext/Authcontext";
import { ToastContainer } from "react-toastify";
import { updateApi } from "../../Api/UserApi/updateApi";
import { userDetails } from "../../Api/UserApi/userDetails";
import { Layout } from "../../Components/Layout/Layout";

export const UpdateAccountPage = () => {
  // context api call here
  const { setUserDetailsInLocalStorage } = allAuthContext();

  // navigation called
  const navigate = useNavigate();

  // use all useState
  const [showPassword, setShowPassword] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // whenever any input changes

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };

  // fetch the specific user details 

  const fetchUserDetails = async () => {
    try {
      const result = await userDetails();
      const { success, message, error, data } = result;

      if (success) {
        setUpdateUser({
          name: data.name,
          email: data.email,
          password: ""
        });
      }
      else if (!success) {
        handleError(message);
        setUpdateUser({
          name: "",
          email: "",
          password: "",
        });
      }
      else {
        handleError(error);
        setUpdateUser({
          name: "",
          email: "",
          password: "",
        });
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  // run useEffect on the first time of page loading

  useEffect(() => {
    fetchUserDetails();
  }, []);


  // update the form Submission

  const handleUpdateFormSubmission = async (e) => {
    e.preventDefault();
    const { name, email, password } = updateUser;

    if (!name && !email && !password) {
      handleError("At least one fields are required.");
      return;
    };

    if (email && !email.includes("@")) {
      handleError("Invalid Email Address");
      return;
    };

    if (password && password.length < 8) {
      handleError("Password must be greater than 8 characters.");
      return;
    };

    try {
      const result = await updateApi(updateUser);
      const { success, message, error, name, email } = result;

      if (success) {
        handleSuccess(message);
        setUserDetailsInLocalStorage(name, email);
        setUpdateUser({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
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
          <title>Update-User | Workshana </title>
          <meta
            name="description"
            content="Update your account on Workasana Account Data."
          />
          <meta
            name="keywords"
            content="Update Page, Update Account, Workasana, Update the Password"
          />
        </Helmet>

        <main className="container">
          <section className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 col-lg-4 py-3">
              <form
                className="p-4 border rounded shadow-lg bg-light border border-light"
                onSubmit={handleUpdateFormSubmission}
              >
                <h2 className="mb-4 text-center">Update Account</h2>
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
                    value={updateUser.name}
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
                    value={updateUser.email}
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
                      value={updateUser.password}
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
                  <button type="submit" className="btn btn-warning w-100">
                    Update
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
