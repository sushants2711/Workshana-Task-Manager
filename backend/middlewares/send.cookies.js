import jwt from "jsonwebtoken";

export const sendCookies = async (userId, res) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: "None", // use in deployment
            // sameSite: "Strict", // for development
            // secure: process.env.NODE_ENV !== "development" // for development
            secure: true // use in deployment
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
