import React, { useEffect } from 'react'
import { Layout } from '../../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

export const LogoutPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 4000);
  })
  return (

    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <div className="card shadow p-5">
          <h1 className="display-4 text-danger mb-3">
             BOOM! You're out!
          </h1>
          <p className="lead text-secondary mb-4">
            The system has officially let you go...
          </p>
          <p className="text-muted">
            Redirecting you to login page within 4 seconds ⏳
          </p>
          <div className="spinner-border text-danger mt-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </Layout>

  )
}
