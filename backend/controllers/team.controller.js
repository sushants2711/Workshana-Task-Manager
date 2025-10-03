import teamModel from "../models/team.model.js";
import mongoose from "mongoose";

export const createTeamController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const nameExist = await teamModel.findOne({ name });

        if (nameExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Team name is already exist."
                });
        };

        const newTeam = new teamModel({
            name,
            description
        });

        const savedData = await newTeam.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Team name created successfully",
                data: savedData
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

export const getTeamController = async (req, res) => {
    try {
        // const loggedInUser = req.user._id

        // if (!loggedInUser) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             message: "User Id is missing"
        //         });
        // };

        // if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             message: "Invalid mongoDb Id"
        //         });
        // };

        const getAllTeam = await teamModel.find();

        if (!getAllTeam || getAllTeam.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Team name found successfully"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Team name found successfully",
                data: getAllTeam
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

export const updateTeamController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const { id } = req.params;


        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        if (!name && !description) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Name is required"
                });
        };

        const teamExist = await teamModel.findById(id);

        if (!teamExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Team not exist"
                });
        };

        if (name && name !== teamExist.name) {
            const uniqueTeam = await teamModel.findOne({ name });

            if (uniqueTeam) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Team already exist"
                    });
            };
        };

        const updateTeam = {
            name: name || teamExist.name,
            description: description || teamExist.description
        };

        const updateByTeamName = await teamModel.findByIdAndUpdate(id, updateTeam, { new: true });

        if (!updateByTeamName) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error occured while updating the team"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Team name Update Successfully",
                data: updateByTeamName
            })


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

export const deleteTeamController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id"
                });
        };

        const teamExist = await teamModel.findById(id);

        if (!teamExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Team not exist"
                });
        };

        const deleteTeam = await teamModel.findByIdAndDelete(id);

        if (!deleteTeam) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Delete the Data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Delete Team Data Successfully"
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

export const getTeamDetailsById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Id is missing"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDB Id"
                });
        };

        const teamExist = await teamModel.findById(id);

        if (!teamExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Team not exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Team Details found Successfully",
                data: teamExist
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