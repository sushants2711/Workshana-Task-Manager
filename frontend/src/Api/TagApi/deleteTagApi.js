export const deleteTagApi = async (id) => {
    try {
        const url = `https://workshana-task-manager.onrender.com/api/v1/tag/delete/${id}`;
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