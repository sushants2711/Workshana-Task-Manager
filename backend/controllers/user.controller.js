import { sendCookies } from "../middlewares/send.cookies.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const signupController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password not match"
                });
        };

        const emailExist = await userModel.findOne({ email });

        if (emailExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email is already exist"
                });
        };

        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        const newUser = new userModel({
            name,
            email,
            password: hash_password
        });

        const newData = await newUser.save();

        await sendCookies(newData._id, res);

        return res
            .status(201)
            .json({
                success: true,
                message: "User created successfully",
                name: newData.name,
                email: newData.email
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not exist"
                });
        };

        const compare_password = await bcrypt.compare(password, userExist.password);

        if (!compare_password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Password Credentials"
                });
        };

        await sendCookies(userExist._id, res);

        return res
            .status(200)
            .json({
                success: true,
                message: "User LoggedIn Successfully",
                name: userExist.name,
                email: userExist.email
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const logoutController = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User id is missing.",
            });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res.status(403).json({
                success: false,
                message: "Invalid mongoDb Id format.",
            });
        };

        res.cookie("jwt", "", { maxAge: 0 });

        return res
            .status(200)
            .json({
                success: true,
                message: "Logout Successfully"
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const updateController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "LoggedIn Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id."
                });
        };

        if (!name && !email && !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At Least one field is required to Update their Profile."
                });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User-not exist"
                });
        };

        if (email && email !== userExist.email) {
            const emailExist = await userModel.findOne({ email });

            if (emailExist) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Email already Exist in someone account."
                    });
            };
        };

        let hash_password = "";
        if (password) {
            const salt_round = 10;
            hash_password = await bcrypt.hash(password, salt_round);
        };

        const updateDate = {
            name: name || userExist.name,
            email: email || userExist.email,
            password: hash_password || userExist.password
        };

        const savedData = await userModel.findByIdAndUpdate(loggedInUser, updateDate, { new: true }).select("-password");

        if (!savedData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error occured while updating the data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "User Update Successfully",
                data: savedData,
                name: savedData.name,
                email: savedData.email
            });
    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const deleteController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "LoggedIn Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id."
                });
        };

        const userExist = await userModel.findById(loggedInUser);

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not exist"
                });
        };

        if (userExist._id.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete their own account",
            });
        };

        const compare_password = await bcrypt.compare(password, userExist.password);

        if (!compare_password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Password"
                });
        };

        if (name.toLowerCase().trim() !== userExist.name.toLowerCase().trim() || email.toLowerCase().trim() !== userExist.email.toLowerCase().trim()) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Please check the details again",
                });
        };

        await userModel.findByIdAndDelete(loggedInUser);

        res.clearCookie("jwt");

        return res
            .status(200)
            .json({
                success: true,
                message: "User deleted Successfully"
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const allUserController = async (req, res) => {
    try {
        const allUser = await userModel.find().select("-password");

        if (!allUser || allUser.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No user found"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "All user fetch Successfully",
                data: allUser
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const getUserDetailsByLoggedInUser = async (req, res) => {
    try {
        const loggedInUser = req.user._id

        if (!loggedInUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid Credentials - User not found."
                });
        };

        if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format."
                });
        };

        const userExist = await userModel.findById(loggedInUser, { password: 0 });

        if (!userExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User not exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "User fetch Successfully",
                data: userExist
            });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};