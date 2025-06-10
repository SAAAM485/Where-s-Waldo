// dataController.js
const db = require("../db/queries");

async function fetchAllImages(req, res) {
    try {
        const images = await db.getAllImages();
        return res.status(200).json({
            success: true,
            data: images,
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Internal Server Error",
            },
        });
    }
}

async function fetchImageById(req, res) {
    const rawId = req.params.imageId;
    const id = parseInt(rawId, 10);

    if (isNaN(id) || id < 1) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_IMAGE_ID",
                message: "id must be a positive integer",
            },
        });
    }

    try {
        const image = await db.getImageById(id);
        if (!image) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "IMAGE_NOT_FOUND",
                    message: "Image not found",
                },
            });
        }
        return res.status(200).json({
            success: true,
            data: image,
        });
    } catch (error) {
        console.error("Error fetching image by ID:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Internal Server Error",
            },
        });
    }
}

async function fetchCharactersByImageId(req, res) {
    const rawImageId = req.params.imageId;
    const imageId = parseInt(rawImageId, 10);

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
        const characters = await db.getCharactersByImageId(imageId);
        if (!characters || characters.length === 0) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "IMAGE_NOT_FOUND",
                    message: "Image not found",
                },
            });
        }
        return res.status(200).json({
            success: true,
            data: characters,
        });
    } catch (error) {
        console.error("Error fetching characters by image ID:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_ERROR",
                message: "Internal Server Error",
            },
        });
    }
}

async function checkCoordinate(req, res) {
    const id = parseInt(req.body.id, 10);
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);

    if (isNaN(id) || id < 1) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_CHARACTER_ID",
                message: "id must be a positive integer",
            },
        });
    }
    if (isNaN(x) || x < 0 || x > 1 || isNaN(y) || y < 0 || y > 1) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_COORDINATE",
                message: "x and y must be numbers between 0 and 1",
            },
        });
    }

    try {
        const isInside = await db.verifyCharacter(id, x, y);
        return res.status(200).json({
            success: true,
            data: { inside: isInside },
        });
    } catch (error) {
        console.error("Error verifying character:", error);
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
    fetchAllImages,
    fetchImageById,
    fetchCharactersByImageId,
    checkCoordinate,
};
