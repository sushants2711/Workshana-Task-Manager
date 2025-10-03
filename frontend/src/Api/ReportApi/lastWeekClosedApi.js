export const lastWeekClosedApi = async () => {
    try {
        const url = "https://workshana-task-manager.onrender.com/api/v1/report/last-week/closed";
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