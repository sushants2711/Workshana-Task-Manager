export const loginApi = async (data) => {
    try {
        const url = "https://workshana-task-manager.onrender.com/api/v1/auth/login";
        const response = await fetch(url, {
            method: "POST",
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