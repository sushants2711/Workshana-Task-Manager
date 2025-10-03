import taskModel from "../models/task.model.js";

export const reportCompletedTaskController = async (req, res) => {
    try {
        const totalCompletedTask = await taskModel.aggregate(
            [
                {
                    $group: {
                        _id: "$status",
                        totalTaskComplete: { $sum: 1 }
                    }
                }
            ]
        );

        if (!totalCompletedTask || totalCompletedTask.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Task Data Available"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully",
                data: totalCompletedTask
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

export const taskCompleteByTeamController = async (req, res) => {
    try {
        const completedTasksByTeam = await taskModel.aggregate([
            {
                $match: { status: "Completed" }
            },
            {
                $group: {
                    _id: "$team",
                    totalCompletedTasks: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "teams",
                    localField: "_id",
                    foreignField: "_id",
                    as: "teamDetails"
                }
            },
            {
                $unwind: "$teamDetails"
            },
            {
                $project: {
                    _id: 0,
                    teamId: "$teamDetails._id",
                    teamName: "$teamDetails.name",
                    totalCompletedTasks: 1
                }
            }
        ]);

        if (!completedTasksByTeam || completedTasksByTeam.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No completed tasks found for any team"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Completed tasks by team fetched successfully",
            data: completedTasksByTeam
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const groupByOwnersController = async (req, res) => {
    try {
        const groupByTeam = await taskModel.aggregate([
            {
                $match: { status: "Completed" }
            },
            {
                $unwind: "$owners"
            },
            {
                $group: {
                    _id: "$owners",
                    totalCompletedTasks: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            {
                $unwind: "$ownerDetails"
            },
            {
                $project: {
                    _id: 0,
                    ownerId: "$ownerDetails._id",
                    name: "$ownerDetails.name",
                    email: "$ownerDetails.email",
                    totalCompletedTasks: 1
                }
            }
        ]);

        return res
            .status(200)
            .json({
                success: true,
                message: "Tasks grouped by owner successfully",
                data: groupByTeam
            });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const lastWeekClosedController = async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const leadsClosedInLastWeek = await taskModel.find({
            status: "Completed",
            updatedAt: { $gte: sevenDaysAgo }
        })

        if (!leadsClosedInLastWeek || leadsClosedInLastWeek.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "No Task Complete in Last Week"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch Successfully",
                data: leadsClosedInLastWeek
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