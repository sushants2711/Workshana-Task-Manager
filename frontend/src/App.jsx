import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./Pages/User/SignupPage";
import { LoginPage } from "./Pages/User/LoginPage";
import { LogoutPage } from "./Pages/User/LogoutPage";
import { UpdateAccountPage } from "./Pages/User/UpdateAccountPage";
import { DeletePage } from "./Pages/User/DeletePage";
import { CreateProjectPage } from "./Pages/Project/CreateProjectPage";
import { AllProjectPage } from "./Pages/Project/AllProjectPage";
import { UpdateProject } from "./Pages/Project/UpdateProject";
import { CreateTaskPage } from "./Pages/Task/CreateTaskPage";
import { AllTaskPage } from "./Pages/Task/AllTaskPage";
import { UpdateTaskPage } from "./Pages/Task/UpdateTaskPage";
import { CreateTeamPage } from "./Pages/Team/CreateTeamPage";
import { AllTeamPage } from "./Pages/Team/AllTeamPage";
import { UpdateTeamPage } from "./Pages/Team/UpdateTeamPage";
import { CreateTagPage } from "./Pages/Tag/CreateTagPage";
import { AllTagPage } from "./Pages/Tag/AllTagPage";
import { UpdateTagPage } from "./Pages/Tag/UpdateTagPage";
import { DetailsTask } from "./Pages/Task/DetailsTask";
import { Dashboard } from "./Pages/Task/Dashboard";
import { PublicRoute } from "./Routes/PublicRoute";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { TaskComplete } from "./Pages/Report/TaskComplete";
import { TeamClosed } from "./Pages/Report/TeamClosed";
import { OwnerComplete } from "./Pages/Report/OwnerComplete";
import { Last7Days } from "./Pages/Report/Last7Days";


function App() {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

        {/* logout route */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/update-profile" element={<PrivateRoute><UpdateAccountPage /></PrivateRoute>} />
        <Route path="/delete-account" element={<PrivateRoute><DeletePage /></PrivateRoute>} />

        {/* Project Routes */}
        <Route path="/create-project" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
        <Route path="/all-project" element={<PrivateRoute><AllProjectPage /></PrivateRoute>} />
        <Route path="/update-project/:id" element={<PrivateRoute><UpdateProject /></PrivateRoute>} />

        {/* Team Routes */}
        <Route path="/create-team" element={<PrivateRoute><CreateTeamPage /></PrivateRoute>} />
        <Route path="/all-team" element={<PrivateRoute><AllTeamPage /></PrivateRoute>} />
        <Route path="/update-team/:id" element={<PrivateRoute><UpdateTeamPage /></PrivateRoute>} />

        {/* Task Routes */}
        <Route path="/create-task" element={<PrivateRoute><CreateTaskPage /></PrivateRoute>} />
        <Route path="/all-task" element={<PrivateRoute><AllTaskPage /></PrivateRoute>} />
        <Route path="/update-task/:id" element={<PrivateRoute><UpdateTaskPage /></PrivateRoute>} />
        <Route path="/details-task/:id" element={<PrivateRoute><DetailsTask /></PrivateRoute>} />

        {/* Tag Routes */}
        <Route path="/create-tag" element={<PrivateRoute><CreateTagPage /></PrivateRoute>} />
        <Route path="/all-tag" element={<PrivateRoute><AllTagPage /></PrivateRoute>} />
        <Route path="/update-tag/:id" element={<PrivateRoute><UpdateTagPage /></PrivateRoute>} />

        {/* Report Routes */}
        <Route path="/report/task-complete" element={<PrivateRoute><TaskComplete /></PrivateRoute> } />
        <Route path="/report/team-closed" element={<PrivateRoute><TeamClosed /> </PrivateRoute>} />
        <Route path="/report/owner-report" element={<PrivateRoute><OwnerComplete /></PrivateRoute>} /> 
        <Route path="/report/last-7-days" element={<PrivateRoute><Last7Days /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
