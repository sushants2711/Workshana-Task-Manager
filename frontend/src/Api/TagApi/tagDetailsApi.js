export const tagDetailsApi = async (id) => {
    try {
        const url = `https://workshana-task-manager.onrender.com/api/v1/tag/details/${id}`;
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