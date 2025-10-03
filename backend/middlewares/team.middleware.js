import joi from "joi";

export const createTeamMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(5).max(80).trim().required(),
            description: joi.string().min(10).max(500).trim().optional().empty("")
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

export const updateTeamMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(5).max(80).trim().optional().empty(""),
            description: joi.string().min(10).max(500).trim().optional().empty("")
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