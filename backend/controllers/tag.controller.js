import mongoose from "mongoose";
import tagModel from "../models/tag.model.js";

export const createTagController = async (req, res) => {
    try {
        const { name } = req.body;

        const nameExist = await tagModel.findOne({ name });

        if (nameExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Name Already Exist"
                });
        };

        const newTag = new tagModel({
            name
        });

        const savedData = await newTag.save();

        return res
            .status(201)
            .json({
                success: true,
                message: "Tag Created Successfully",
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

export const getAllTagController = async (req, res) => {
    try {
        const allTag = await tagModel.find();

        if (!allTag || allTag.length === 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag is not exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tag fetch Successfully",
                data: allTag
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

export const updateTagController = async (req, res) => {
    try {
        const { id } = req.params;

        const { name } = req.body;

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

        if(!name) {
            return res
            .status(400)
            .json({
                success: false,
                message: "Name is required"
            });
        };

        const tagExist = await tagModel.findById(id);

        if (!tagExist) {
            return res
                .status(400)
                .json({
                    success: true,
                    message: "Tag not Exist"
                });
        };

        if (name && name !== tagExist.name) {
            const isUniqueNameExist = await tagModel.findOne({ name });
            if (isUniqueNameExist) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message: "Tag must be unique"
                    });
            };
        };

        const updateData = {
            name: name || tagExist.name
        };

        const updateTag = await tagModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateTag) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Updating the Tag"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tag Update Successfully",
                data: updateTag
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

export const deleteTagController = async (req, res) => {
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
                    message: "Invalid mongoDb Id format."
                });
        };

        const tagExist = await tagModel.findById(id);

        if (!tagExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag not exist"
                });
        };

        const deleteTag = await tagModel.findByIdAndDelete(id);

        if (!deleteTag) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Error Occured While Deleting the tag."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tag Delete Successfully"
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

export const TagDetailsById = async (req, res) => {
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
                    message: "Invalid mongoDb Id format."
                });
        };

        const tagExist = await tagModel.findById(id);

        if (!tagExist) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Tag not exist"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Tag Details found Successfully",
                data: tagExist
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