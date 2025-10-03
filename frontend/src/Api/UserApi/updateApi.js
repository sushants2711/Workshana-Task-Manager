export const updateApi = async (data) => {
    try {
        const url = "https://workshana-task-manager.onrender.com/api/v1/auth/update";
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