import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { handleError } from "../../ToastMessages/errorMessage";
import { signupApi } from "../../Api/UserApi/signupAPi";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { allAuthContext } from "../../Context/Authcontext/Authcontext";
import { ToastContainer } from "react-toastify";
import { Layout } from "../../Components/Layout/Layout";

export const SignupPage = () => {
  // context api call here
  const { setUserDetailsInLocalStorage } = allAuthContext();

  // navigation called
  const navigate = useNavigate();

  // use all useState
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const handleSignupFormSubmission = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signup;

    if (!name || !email || !password || !confirmPassword) {
      handleError("All fields are required.");
      return;
    };

    if (email && !email.includes("@")) {
      handleError("Invalid Email Address");
      return;
    };

    if (password.length < 8 || confirmPassword.length < 8) {
      handleError("Password must be greater than 8 characters.");
      return;
    };

    if (password !== confirmPassword) {
      handleError("Invalid Password Credentials.");
      return;
    };

    try {
      const result = await signupApi(signup);
      const { success, message, error, name, email } = result;

      if (success) {
        handleSuccess(message);
        setUserDetailsInLocalStorage(name, email)
        setSignup({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
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
          <title>Signup | Workshana </title>
          <meta
            name="description"
            content="Create your account on Workasana to enjoy seamless information about the user, project and assign tasks information."
          />
          <meta
            name="keywords"
            content="signup, register, Workasana, TaskManagement"
          />
        </Helmet>

        <main className="container">
          <section className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-8 col-lg-5 py-3">
              <form
                className="p-4 border rounded shadow-lg bg-light border border-light"
                onSubmit={handleSignupFormSubmission}
              >
                <h2 className="mb-4 text-center">Signup</h2>
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
                    value={signup.name}
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
                    value={signup.email}
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
                      value={signup.password}
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
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Enter Your Password Again"
                      className="form-control"
                      onChange={handleChange}
                      value={signup.confirmPassword}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary text-danger"
                      onClick={() => setConfirmPassword(!confirmPassword)}
                    >
                      {confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary w-100">
                    Signup
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Already Have an Account? <Link to="/login">Login</Link>
                  </p>
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
