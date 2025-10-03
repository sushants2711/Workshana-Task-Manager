export const deleteTaskApi = async (id) => {
    try {
        const url = `http://localhost:5600/api/v1/task/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};