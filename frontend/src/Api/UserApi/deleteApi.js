export const deleteApi = async (data) => {
    try {
        const url = "http://localhost:5600/api/v1/auth/delete";
        const response = await fetch(url, {
            method: "DELETE",
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