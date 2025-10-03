export const updateTaskApi = async (id, data) => {
    try {
        const url = `http://localhost:5600/api/v1/task/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};