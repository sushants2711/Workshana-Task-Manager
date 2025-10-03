// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { AuthcontextProvider } from './Context/Authcontext/Authcontext.jsx';
import { TaskContextProvider } from './Context/Taskcontext/TaskContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthcontextProvider>
        <TaskContextProvider>
           <App />
        </TaskContextProvider>
      </AuthcontextProvider>
    </BrowserRouter>
  // </StrictMode>,
)
