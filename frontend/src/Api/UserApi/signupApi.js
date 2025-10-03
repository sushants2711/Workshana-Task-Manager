export const signupApi = async (data) => {
    try {
        const url = "http://localhost:5600/api/v1/auth/signup";
        const response = await fetch (url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};