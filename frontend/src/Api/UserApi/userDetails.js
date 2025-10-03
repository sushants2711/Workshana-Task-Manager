export const userDetails = async () => {
    try {
        const url = "https://workshana-task-manager.onrender.com/api/v1/auth/user-details";
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