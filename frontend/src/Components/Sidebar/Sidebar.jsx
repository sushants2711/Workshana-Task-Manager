import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { logoutApi } from "../../Api/UserApi/logoutApi";
import { handleSuccess } from "../../ToastMessages/successMessage";
import { handleError } from "../../ToastMessages/errorMessage";
import { allAuthContext } from "../../Context/Authcontext/Authcontext";

export const Sidebar = () => {

    const navigate = useNavigate();

    const { removeUserDetailsFromLocalStorage } = allAuthContext();

    const name = localStorage.getItem("name");

    const handleLogout = async () => {
        const result = await logoutApi();
        const { success, message, error } = result;

        if (success) {
            handleSuccess(message);
            removeUserDetailsFromLocalStorage();
            setTimeout(() => {
                navigate("/logout");
            }, 3000);
        } else if (!success) {
            handleError(message);
        } else {
            handleError(error);
        };
    };

    return (
        <>
            <style>{`
        .nav-link {
          color: #adb5bd;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 6px;
          transition: all 0.3s ease-in-out;
        }

        .nav-link:hover {
          color: #fff;
          background-color: #0c56b6ff;
        }

        .nav-link.active {
          color: #fff !important;
          background: linear-gradient(90deg, #0d6efd, #0b5ed7);
          font-weight: 600;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(13, 110, 253, 0.25);
        }
      `}</style>

            {/* Toggle Button for Mobile */}
            <div className="d-md-none bg-light p-2 border-bottom">
                <button
                    className="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileSidebar"
                >
                    <ArrowRight />
                </button>
            </div>

            {/* Sidebar for large screens */}
            <nav className="col-md-3 col-lg-2 d-none d-md-block bg-dark p-3 border-end border-light">
                <ul className="nav flex-column">
                    <li className="nav-item mt-0 text-center">
                        <img
                            src="/task-manager logo.png"
                            alt="Logo"
                            height={100}
                            width={150}
                            className=""
                        />
                    </li>

                    <li className="nav-item mt-3">
                        <NavLink to="/" className="nav-link text-light">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/create-project" className="nav-link text-light">
                            Create Project
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/create-team" className="nav-link text-light">
                            Create Team
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/create-tag" className="nav-link text-light">
                            Create Tag
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/create-task" className="nav-link text-light">
                            Create Task
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/all-project" className="nav-link text-light">
                            All Project
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/all-team" className="nav-link text-light">
                            All Team
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/all-tag" className="nav-link text-light">
                            All Tag
                        </NavLink>
                    </li>
                    <li className="nav-item mt-2">
                        <NavLink to="/all-task" className="nav-link text-light">
                            All Task
                        </NavLink>
                    </li>
                    
                    <li className="nav-item mt-2">
                        <button
                            className="nav-link text-light w-100 text-start d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            data-bs-target="#settingsCollapses"
                            aria-expanded="false"
                        >
                            Reports
                            <i className="bi bi-chevron-down small"></i>
                        </button>


                        <div className="collapse ms-3 mt-1" id="settingsCollapses">
                            <NavLink to="/report/task-complete" className="nav-link text-light">
                                Task Report
                            </NavLink>
                            <NavLink to="/report/team-closed" className="nav-link text-light">
                                Closed By Team
                            </NavLink>
                            <NavLink to="/report/last-7-days" className="nav-link text-light">
                                Last 7 Days
                            </NavLink>
                            <NavLink to="/report/owner-report" className="nav-link text-light">
                                Owners Report
                            </NavLink>
                        </div>
                    </li>

                    <li className="nav-item mt-2">
                        <button
                            className="nav-link text-light w-100 text-start d-flex justify-content-between align-items-center"
                            data-bs-toggle="collapse"
                            data-bs-target="#settingsCollapse"
                            aria-expanded="false"
                        >
                            Settings
                            <i className="bi bi-chevron-down small"></i>
                        </button>


                        <div className="collapse ms-3 mt-1" id="settingsCollapse">
                            <NavLink to="/update-profile" className="nav-link text-warning mb-2">
                                Update Profile
                            </NavLink>
                            <NavLink to="/delete-account" className="nav-link text-danger">
                                Delete Account
                            </NavLink>
                        </div>
                    </li>


                    {/* Show Signup/Login only if user is NOT logged in */}
                    {!name && (
                        <>
                            <li className="nav-item mt-2">
                                <NavLink to="/signup" className="nav-link text-light">
                                    Signup
                                </NavLink>
                            </li>
                            <li className="nav-item mt-2">
                                <NavLink to="/login" className="nav-link text-light">
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}

                    {
                        name && <>
                            <li className="nav-item mt-2">
                                <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    }
                </ul>
            </nav>

            {/* Mobile offcanvas */}
            <div
                className="offcanvas offcanvas-start d-md-none"
                tabIndex="-1"
                id="mobileSidebar"
            >
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <ul className="nav flex-column">
                        <li className="nav-item text-center">
                            <img
                                src="/task-manager logo.png"
                                alt="Logo"
                                height={100}
                                width={150}
                            />
                        </li>

                        <li className="nav-item mt-3">
                            <NavLink to="/" className="nav-link">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/create-project" className="nav-link">
                                Create Project
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/create-team" className="nav-link">
                                Create Team
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/create-tag" className="nav-link">
                                Create Tag
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/create-task" className="nav-link">
                                Create Task
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/all-project" className="nav-link">
                                All Project
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/all-team" className="nav-link">
                                All Team
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/all-tag" className="nav-link">
                                All Tag
                            </NavLink>
                        </li>
                        <li className="nav-item mt-2">
                            <NavLink to="/all-task" className="nav-link">
                                All Task
                            </NavLink>
                        </li>
                        

                        <li className="nav-item mt-2">
                            <button
                                className="nav-link w-100 text-start d-flex justify-content-between align-items-center"
                                data-bs-toggle="collapse"
                                data-bs-target="#mobileSettingsCollapsess"
                                aria-expanded="false"
                            >
                               Reports
                                <i className="bi bi-chevron-down small"></i>
                            </button>

                            <div className="collapse ms-3 mt-1" id="mobileSettingsCollapsess">
                                <NavLink to="/report/task-complete" className="nav-link">
                                    Task Report
                                </NavLink>
                                <NavLink to="/report/team-closed" className="nav-link">
                                    Closed By Team
                                </NavLink>
                                <NavLink to="/report/last-7-days" className="nav-link">
                                    Last 7 Days
                                </NavLink>
                                <NavLink to="/report/owner-report" className="nav-link">
                                    Owners Report
                                </NavLink>
                            </div>
                        </li>

                        {/* Settings Collapse for Mobile */}
                        <li className="nav-item mt-2">
                            <button
                                className="nav-link w-100 text-start d-flex justify-content-between align-items-center"
                                data-bs-toggle="collapse"
                                data-bs-target="#mobileSettingsCollapse"
                                aria-expanded="false"
                            >
                                Settings
                                <i className="bi bi-chevron-down small"></i>
                            </button>

                            <div className="collapse ms-3 mt-1" id="mobileSettingsCollapse">
                                <NavLink to="/update-profile" className="nav-link text-warning mb-2">
                                    Update Profile
                                </NavLink>
                                <NavLink to="/delete-account" className="nav-link text-danger">
                                    Delete Account
                                </NavLink>
                            </div>
                        </li>

                        {/* Auth Buttons */}
                        {!name && (
                            <>
                                <li className="nav-item mt-2">
                                    <NavLink to="/signup" className="nav-link">
                                        Signup
                                    </NavLink>
                                </li>
                                <li className="nav-item mt-2">
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {name && (
                            <li className="nav-item mt-2">
                                <button className="btn btn-danger w-100" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

            </div>
        </>
    );
};
