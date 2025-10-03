export const updateTagApi = async (id, data) => {
    try {
        const url = `https://workshana-task-manager.onrender.com/api/v1/tag/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};