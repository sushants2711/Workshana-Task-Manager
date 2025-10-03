import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError } from '../../ToastMessages/errorMessage';
import { loginApi } from '../../Api/UserApi/loginApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { allAuthContext } from '../../Context/Authcontext/Authcontext';
import { ToastContainer } from 'react-toastify';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from 'react-helmet';

export const LoginPage = () => {

  // context api call here
  const { setUserDetailsInLocalStorage } = allAuthContext();

  // navigation called
  const navigate = useNavigate();

  // all useState Hooks
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({
      ...login,
      [name]: value
    });
  };

  const handleLoginFormSUbmission = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    if (!email || !password) {
      handleError("All fields are required.");
      return;
    };

    if (email && !email.includes("@")) {
      handleError("Invalid Email format.");
      return;
    };

    if (password.length < 8) {
      handleError("Password must be greater than 8 characters.");
      return;
    };

    try {
      const result = await loginApi(login);
      const { success, message, error, name, email } = result;

      if (success) {
        handleSuccess(message);
        setUserDetailsInLocalStorage(name, email);
        setLogin({
          name: "",
          password: ""
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
    <Layout>

      <Helmet>
          <title>Login| Workshana </title>
          <meta
            name="description"
            content="Login to your account on Workasana to enjoy seamless information about the user, project and assign tasks information."
          />
          <meta
            name="keywords"
            content="signup, register, Login, Workasana, TaskManagement"
          />
        </Helmet>

      <main className='container'>
        <section className="row justify-content-center align-items-center min-vh-100">
          <div className='col-md-8 col-lg-4 py-3'>

            <form className="p-4 border rounded shadow-lg bg-light border border-light" onSubmit={handleLoginFormSUbmission}>

              <h2 className='text-center mb-4'>Login</h2>
              <hr />

              <div className='mb-3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" name="email" id="email" placeholder='Enter Your Email' className='form-control' onChange={handleChange} />
              </div>

              <div className='mb-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <div className='input-group'>
                  <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder='Enter Your Password' className='form-control' onChange={handleChange} />
                  {" "}
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-danger"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className='mb-3'>
                <button type='submit' className='btn btn-primary w-100'>Login</button>
              </div>
              <p className='text-center'>
                Don't have an Account?
                {" "} <Link to="/signup">Signup</Link>
              </p>
            </form>
          </div>
        </section>
        <ToastContainer />
      </main>
    </Layout>
  )
}
