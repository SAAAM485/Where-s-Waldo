const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function fetchRecordsByImageId(req, res) {
    const rawId = req.params.imageId;
    const imageId = parseInt(rawId, 10);

    // Validate imageId parameter
    if (isNaN(imageId) || imageId < 1) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_IMAGE_ID",
                message: "imageId must be a positive integer",
            },
        });
    }

    try {
        // Fetch records from database
        const records = await db.getRecordsByImageId(imageId);
        return res.status(200).json({
            success: true,
            data: records,
        });
    } catch (error) {
        console.error("Error fetching records by image ID:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Internal Server Error",
            },
        });
    }
}

async function createRecord(req, res) {
    // 1. Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Validation failed for one or more fields",
                details: errors.array(),
            },
        });
    }

    // 2. Parse and validate individual fields
    const imageId = parseInt(req.body.imageId, 10);
    const name = req.body.name;
    const score = parseFloat(req.body.score);

    if (isNaN(imageId) || imageId < 1) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_IMAGE_ID",
                message: "imageId must be a positive integer",
            },
        });
    }
    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_NAME",
                message: "name is required and must be a non-empty string",
            },
        });
    }
    if (isNaN(score) || score < 0) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_SCORE",
                message: "score must be a number greater than or equal to 0",
            },
        });
    }

    try {
        // 3. Create new record in database
        const newRecord = await db.writeRecord(imageId, name, score);
        return res.status(201).json({
            success: true,
            data: newRecord,
        });
    } catch (error) {
        console.error("Error creating record:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Internal Server Error",
            },
        });
    }
}

module.exports = {
    fetchRecordsByImageId,
    createRecord,
};
