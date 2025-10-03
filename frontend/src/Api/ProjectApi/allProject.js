export const allProjectApi= async () => {
    try {
        const url = "http://localhost:5600/api/v1/project/all";
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