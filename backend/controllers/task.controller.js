import taskModel from "../models/task.model.js";
import projectModel from "../models/project.model.js";
import teamModel from "../models/team.model.js";
import userModel from "../models/user.model.js";
import mongoose from "mongoose";


export const createTaskController = async (req, res) => {
    try {
        const { name, project, team, owners, tags, timeToComplete, status } = req.body;

        // const loggedInUser = req.user._id;

        // if (!loggedInUser) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             message: "User are not currently loggedIn"
        //         });
        // };

        // if (!mongoose.Types.ObjectId.isValid(loggedInUser)) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             message: "Invalid mongoDb Id format"
        //         });
        // };

        if (!mongoose.Types.ObjectId.isValid(project)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        };

        if (!mongoose.Types.ObjectId.isValid(team)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Invalid mongoDb Id format"
                });
        }

        if (!Array.isArray(owners) || owners.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Owners must be an array"
                });
        };

        if (!Array.isArray(tags)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tags must be an array"
                });
        };

        if (Array.isArray(owners) && owners.length > 0) {
            for (const key of owners) {
                if (!mongoose.Types.ObjectId.isValid(key)) {
                    return res
                        .status(400)
                        .json({
                            success: false,
                            message: `Invalid MongoDB Id format for owner: ${key}`
                        });
                };
            };
        };


        const projectExist = await projectModel.findById(project);

        if (!projectExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Project not exist"
                });
        };

        const teamExist = await teamModel.findById(team);

        if (!teamExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Team not exist"
                });
        };


        const ownersExist = await userModel.find({ _id: { $in: owners } });
        if (ownersExist.length !== owners.length) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "One or more owners do not exist"
                });
        };



        const newTaskData = new taskModel({
            name,
            project,
            team,
            owners,
            tags,
            timeToComplete,
            status
        });

        const savedData = await newTaskData.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Task Created Successfully",
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

// filter by name , project, team, owners status
export const getAllTaskController = async (req, res) => {
    try {
        const { name, project, team, owners, status, timeToComplete } = req.query;

        const sortOption = {};

        if(timeToComplete === "asc") {
            sortOption.timeToComplete = 1;
        }else if(timeToComplete === "dsc") {
            sortOption.timeToComplete = -1;
        };

        if (!name && !project && !team && !owners && !status) {
            const allTask = await taskModel.find().populate("project", "name description").populate("team", "name description").populate("owners", "name email").sort(sortOption);

            if (!allTask || allTask.length === 0) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Task not exist"
                    });
            };

            return res
                .status(200)
                .json({
                    success: true,
                    message: "Task found Successfully",
                    data: allTask
                });
        };

        let filterOption = {};

        if (name) {
            filterOption.name = { $regex: name, $options: "i" }
        };

        if (project) {
            filterOption.project = { $regex: project, $options: "i" }
        };

        if (team) {
            filterOption.team = { $regex: team, $options: "i" }
        };

        if (owners) {
            filterOption.owners = { $regex: owners }
        };

        if (status) {
            filterOption.status = { $regex: status }
        };

        const allFilterData = await taskModel.find(filterOption).populate("project", "name description").populate("team", "name description").populate("owners", "name email").sort(sortOption);

        if (!allFilterData || allFilterData.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task fetch Successfully",
                data: allFilterData
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

export const updateTaskController = async (req, res) => {
    try {
        const { name, project, team, owners, tags, timeToComplete, status } = req.body;

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

        if (!name && !project && !team && !owners && !tags && !timeToComplete && !status) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "At least one field is required to update the Task."
                });
        };

        if (owners) {
            if (!Array.isArray(owners)) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Owners must be an array"
                    });
            };
        };

        if (project) {
            if (!mongoose.Types.ObjectId.isValid(project)) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid mongoDb Id format"
                    });
            };
        };

        if (team) {
            if (!mongoose.Types.ObjectId.isValid(team)) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid mongoDb Id format"
                    });
            };
        };

        if (tags) {
            if (!Array.isArray(tags)) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Tag must be an array"
                    });
            };
        };

        if (Array.isArray(owners) && owners.length > 0) {
            for (const key of owners) {
                if (!mongoose.Types.ObjectId.isValid(key)) {
                    return res
                        .status(400)
                        .json({
                            success: false,
                            message: `Invalid MongoDB Id format for owner: ${key}`
                        });
                };
            };
        };

        const taskExist = await taskModel.findById(id);

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not exist"
                });
        };

        if (project) {
            const projectExist = await projectModel.findById(project);

            if (!projectExist) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Project not exist"
                    });
            };
        };

        if (team) {
            const teamExist = await teamModel.findById(team);

            if (!teamExist) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Team not exist"
                    });
            };
        };

        if (Array.isArray(owners) && owners.length > 0) {

            const ownersExist = await userModel.find({ _id: { $in: owners } });

            if (ownersExist.length !== owners.length) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "One or more owners do not exist"
                    });
            };
        };

        const data = {
            name: name || taskExist.name,
            project: project || taskExist.project,
            team: team || taskExist.team,
            owners: owners || taskExist.owners,
            tags: tags || taskExist.tags,
            timeToComplete: timeToComplete || taskExist.timeToComplete,
            status: status || taskExist.status,
            updatedAt: new Date()
        };

        const updateData = await taskModel.findByIdAndUpdate(id, data, {new: true});

        if(!updateData) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Failed to Update the value"
            });
        };

        return res
        .status(200)
        .json({
            success: true,
            message: "Task update successfully",
            data: updateData
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

export const deleteTaskController = async (req, res) => {
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
                    message: "Invalid mongoDb Id format"
                });
        };

        const taskExist = await taskModel.findById(id);

        if (!taskExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not exist"
                });
        };

        const deleteData = await taskModel.findByIdAndDelete(id);

        if (!deleteData) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured while deleting the data"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Task delete Successfully"
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

export const getTaskByIdController = async (req, res) => {
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
                    message: "Invalid mongoDB Id format."
                });
        };

        const taskExist = await taskModel.findById(id);

        if (!taskExist || taskExist.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Task not Exist."
                });
        };

        const displayAllTaskDetails = await taskModel.findById(taskExist._id).populate("project", "name description").populate("team", "name description").populate("owners", "name email");

        return res
            .status(200)
            .json({
                success: true,
                message: "Task find Successfully",
                data: displayAllTaskDetails
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