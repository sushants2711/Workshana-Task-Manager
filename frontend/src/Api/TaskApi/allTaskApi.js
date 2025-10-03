export const allTaskApi = async (status) => {
    try {
        let url = "https://workshana-task-manager.onrender.com/api/v1/task/all";

        if(status) {
            url = `https://workshana-task-manager.onrender.com/api/v1/task/all?status=${status}`;
        }
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};



export const getAllTaskFilterAPI = async (filters = {}) => {
  try {
    let url = `https://workshana-task-manager.onrender.com/api/v1/task/all`;

    // Convert filters object to query string dynamically
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value); // only append non-empty values
    });

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include"
    });
// console.log(url)
    return await response.json();
  } catch (error) {
    // console.error("Error fetching leads:", error);
    // return { success: false, message: error.message };
    throw new Error(error.message);
  };
};