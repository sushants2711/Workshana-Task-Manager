import React, { useEffect, useState } from 'react';
import { Layout } from '../../Components/Layout/Layout';
import { Helmet } from 'react-helmet';
import { handleError } from '../../ToastMessages/errorMessage';
import { allProjectApi } from '../../Api/ProjectApi/allProject';
import { allTeamApi } from '../../Api/TeamApi/allTeamApi';
import { getAllUsers } from '../../Api/UserApi/getAllUsers';
import { ToastContainer } from 'react-toastify';
import { addTaskAPi } from '../../Api/TaskApi/addTaskApi';
import { handleSuccess } from '../../ToastMessages/successMessage';
import { useNavigate } from 'react-router-dom';

export const CreateTaskPage = () => {

  const navigate = useNavigate();

  const [projectData, setprojectData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);


  const fetchProject = async () => {
    try {
      const result = await allProjectApi();
      const { success, message, error, data } = result;

      if (success) {
        setprojectData(data);
      }
      else if (!success) {
        handleError(message);
        setprojectData([]);
      }
      else {
        handleError(error);
        setprojectData([]);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  const fetchTeamData = async () => {
    try {
      const result = await allTeamApi();
      const { success, message, error, data } = result;

      if (success) {
        setTeamData(data);
      }
      else if (!success) {
        handleError(message);
        setTeamData([]);
      }
      else {
        handleError(error);
        setTeamData([]);
      };
    } catch (error) {
      handleError(error.message);
    };
  };

  const fetchOwnerData = async () => {
    try {
      const result = await getAllUsers();
      const { success, message, error, data } = result;

      if (success) {
        setOwnerData(data);
      }
      else if (!success) {
        handleError(message);
        setOwnerData([]);
      }
      else {
        handleError(error);
        setOwnerData([]);
      };
    } catch (error) {
      handleError(error.message);
    };
  };


  useEffect(() => {
    fetchProject();
    fetchTeamData();
    fetchOwnerData();
  }, []);
  

  // console.log(projectData);
  // console.log(teamData);
  // console.log(ownerData);

  const [taskData, setTaskData] = useState({
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: [],
    timeToComplete: "",
    status: ""
  })

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (name === "owners") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setTaskData({ ...taskData, owners: values });
    } else if (name === "tags") {
      const values = value.split(", ").map((tag) => tag.trim());
      setTaskData({ ...taskData, tags: values });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleCreateTaskFormSubmission = async (e) => {
    e.preventDefault();

    const { name, project, team, owners, tags, timeToComplete, status } = taskData;

    if (!name) {
      handleError("Task name is required.");
      return;
    };

    if (!project) {
      handleError("Project Name is required.");
      return;
    };

    if (!team) {
      handleError("Team Name is required.");
      return;
    };

    if (!owners) {
      handleError("Project Owners is required.");
      return;
    };

    if (!timeToComplete) {
      handleError("Time is required");
      return;
    };

    if (name && name.length < 5) {
      handleError("Name must be 5 Characters long");
      return;
    };

    if (owners && !Array.isArray(owners)) {
      handleError("Project Owner must be an array.");
      return;
    };

    if (tags && !Array.isArray(tags)) {
      handleError("Tags must be an array.");
      return;
    };

    if (owners && Array.isArray(owners) && owners.length === 0) {
      handleError("Owner Array Can't be Zero.");
      return;
    }

    if (tags && Array.isArray(tags) && tags.length === 0) {
      handleError("Tag Array must be greater than zero.");
      return;
    };

    if(timeToComplete && timeToComplete <= 0) {
      handleError("Time must be graeter than 0.");
      return;
    }

    try {
      const result = await addTaskAPi(taskData);
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTaskData({
          name: "",
          project: "",
          team: "",
          owners: [],
          tags: [],
          timeToComplete: "",
          status: ""
        });
        setTimeout(() => {
          navigate("/all-task");
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
        <title>Create-Task | Workshana</title>
        <meta name='description' content='Create Your Workshana Task...' />
        <meta name='keywords' content='create Task, Create Team, Task, workshana, TaskManager' />
      </Helmet>

      <main className='container'>
        <section className='row justify-content-center align-items-center min-vh-100'>
          <div className="col-md-12 col-lg-8 py-3">
            <form
              className="p-4 border rounded shadow-lg bg-light border border-light"
              onSubmit={handleCreateTaskFormSubmission}
            >
              <h2 className="mb-4 text-center">Create Task</h2>
              <hr />

              <div className="mb-3 mt-4">

                <label htmlFor="name" className="form-label">
                  Task Name
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Task Name"
                  className="form-control"
                  onChange={handleChange}
                  value={taskData.name}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor="project" className='form-label'>Project</label>

                <select name="project" id="project" className='form-control' onChange={handleChange} value={taskData.project}>
                  <option value="" selected disabled>Select the Project</option>
                  {
                    projectData.map((curr) => (

                      <option key={curr._id} value={curr._id}>{curr.name}</option>

                    ))
                  }
                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor="team" className='form-label'>Team Name</label>

                <select name="team" id="team" className='form-control' onChange={handleChange} value={taskData.team}>
                  <option value="" selected disabled>Select the Team name</option>
                  {
                    teamData.map((curr) => (

                      <option key={curr._id} value={curr._id}>{curr.name}</option>

                    ))
                  }
                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor="owners" className='form-label'>Owners (Multiple)</label>

                <select name="owners" id="owners" className='form-control' onChange={handleChange} multiple style={{ height: "150px" }} value={taskData.owners}>
                  {
                    ownerData.map((curr) => (

                      <option key={curr._id} value={curr._id}>{curr.email}</option>

                    ))
                  }
                </select>
              </div>

              <div className='mb-3'>
                <label htmlFor="tags" className='form-label'>Tags</label>

                <input type="text" name="tags" id="tags" placeholder='Enter Your Comma Separated tags name like follow-me, hard-work ...' className='form-control' onChange={handleChange} value={taskData.tags.join(", ")} />
              </div>

              <div className='mb-3'>
                <label htmlFor="timeToComplete" className='form-label'>Time (Days)</label>

                <input type="number" name="timeToComplete" id="timeToComplete" placeholder='Enter Your Total Days that you want' className='form-control' onChange={handleChange} value={taskData.timeToComplete} />
              </div>

              <div className='mb-3'>
                <label htmlFor="status" className='form-label'>Status</label>

                <select name="status" id="status" className='form-control' onChange={handleChange} value={taskData.status}>
                  <option value="" selected disabled>Select the Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className='mb-3'>
                <button type='submit' className='btn btn-primary w-100'>Add Task</button>
              </div>
            </form>
          </div>
        </section>
        <ToastContainer limit={1} />
      </main>
    </Layout>
  )
}
