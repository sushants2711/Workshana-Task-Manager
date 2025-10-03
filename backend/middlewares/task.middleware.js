import joi from "joi";

export const createTaskMiddleware = async (req, res, next) => {
    try {

        if (req.body && typeof req.body.tags === "string") {
            try {
                req.body.tags = JSON.parse(req.body.tags);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'tags' field",
                        error: error.message
                    });
            };
        };

        if (req.body && typeof req.body.owners === "string") {
            try {
                req.body.owners = JSON.parse(req.body.owners);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'owners' field",
                        error: error.message
                    });
            };
        };

        const schema = joi.object({
            name: joi.string().trim().min(5).max(500).required(),
            project: joi.string().min(5).max(400).required().trim(),
            team: joi.string().min(24).max(24).required().trim(),
            owners: joi.array().items(joi.string().trim().optional().empty("").min(24).max(24)).required(),
            tags: joi.array().items(joi.string().min(2).max(400).optional().empty("")).optional().empty(""),
            timeToComplete: joi.number().invalid(0).greater(0).positive().required(),
            status: joi.string().trim().valid('To Do', 'In Progress', 'Completed', 'Blocked').optional().empty("")
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

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

export const updateTaskMiddleware = async (req, res, next) => {
    try {

        if (req.body && typeof req.body.tags === "string") {
            try {
                req.body.tags = JSON.parse(req.body.tags);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'tags' field",
                        error: error.message
                    });
            };
        };

        if (req.body && typeof req.body.owners === "string") {
            try {
                req.body.owners = JSON.parse(req.body.owners);
            } catch (error) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Invalid JSON format in 'owners' field",
                        error: error.message
                    });
            };
        };

        const schema = joi.object({
            name: joi.string().trim().min(5).max(500).optional().empty(""),
            project: joi.string().min(5).max(400).trim().optional().empty(""),
            team: joi.string().min(24).max(24).trim().optional().empty(""),
            owners: joi.array().items(joi.string().trim().optional().empty("").min(24).max(24)).optional().empty(""),
            tags: joi.array().items(joi.string().min(2).max(400).optional().empty("")).optional().empty(""),
            timeToComplete: joi.number().invalid(0).greater(0).positive().optional().empty(""),
            status: joi.string().trim().valid('To Do', 'In Progress', 'Completed', 'Blocked').optional().empty("")
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();
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