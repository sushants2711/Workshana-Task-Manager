import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProjectController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const nameExist = await projectModel.findOne({ name });

        if (nameExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Project name is already available"
                });
        };

        const newProject = new projectModel({
            name,
            description
        });

        const saveProject = await newProject.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Project Created Successfully",
                data: saveProject
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

export const getAllProjectController = async (req, res) => {
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

        const getAllProjectData = await projectModel.find();

        if (!getAllProjectData || getAllProjectData.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Project found Currently"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Project Data found Successfully",
                data: getAllProjectData
            });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: true,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const updateProjectController = async (req, res) => {
    try {
        const { name, description } = req.body;

        const { id } = req.params;

        if (!name && !description) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required"
                });
        };

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
                    success: true,
                    message: "Invalid mongoDb Id"
                });
        };

        const projectExist = await projectModel.findById(id);

        if (!projectExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Project not exist"
                });
        };

        if (name && name !== projectExist.name) {
            const uniqueName = await projectModel.findOne({ name });

            if (uniqueName) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Name must be unique"
                    });
            };
        };

        const updateProject = {
            name: name || projectExist.name,
            description: description || projectExist.description
        };

        const updatedProjectData = await projectModel.findByIdAndUpdate(id, updateProject, { new: true });

        if (!updatedProjectData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error occured while updating the data."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data update successfully",
                data: updatedProjectData
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

export const deleteProjectController = async (req, res) => {
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

        const projectExist = await projectModel.findById(id);

        if (!projectExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Project not exist"
                });
        };

        const deleteProject = await projectModel.findByIdAndDelete(id);

        if (!deleteProject) {
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
                message: "Project Delete Successfully"
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

export const getProjectById = async (req, res) => {
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

        const projectExist = await projectModel.findById(id);

        if (!projectExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Project not exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Project details found Successfully",
                data: projectExist
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