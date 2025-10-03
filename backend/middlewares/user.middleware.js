import joi from "joi";

export const signupMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).required().trim(),
            email: joi.string().email().required().min(8).max(50).trim().lowercase(),
            password: joi.string().min(8).max(100).required(),
            confirmPassword: joi.string().min(8).max(100).required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0].message
                });
        };

        next();
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

export const loginMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().email().required().min(8).max(50).trim().lowercase(),
            password: joi.string().min(8).max(100).required(),
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

export const updateMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).trim().optional().empty(""),
            email: joi.string().email().min(8).max(50).trim().lowercase().optional().empty(""),
            password: joi.string().min(8).max(100).optional().empty(""),
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

export const deleteMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).required().trim(),
            email: joi.string().email().required().min(8).max(50).trim().lowercase(),
            password: joi.string().min(8).max(100).required(),
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