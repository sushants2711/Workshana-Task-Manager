export const logoutApi = async () => {
    try {
        const url = "https://workshana-task-manager.onrender.com/api/v1/auth/logout";
        const response = await fetch(url, {
            method: "POST",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};