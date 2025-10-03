export const getAllUsers = async () => {
    try {
        const url = "http://localhost:5600/api/v1/auth/all-user";
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