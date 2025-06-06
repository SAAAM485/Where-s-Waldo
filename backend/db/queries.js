const prisma = require("./client");

async function getAllImages() {
    try {
        const images = await prisma.image.findMany({
            orderBy: {
                id: "desc",
            },
        });
        return images;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
async function getImageById(id) {
    try {
        const image = await prisma.image.findUnique({
            where: { id },
        });
        return image;
    } catch (error) {
        console.error("Error fetching image by ID:", error);
        throw error;
    }
}

async function getCharactersByImageId(imageId) {
    try {
        const characters = await prisma.character.findMany({
            where: { imageId },
            orderBy: {
                id: "asc",
            },
        });
        return characters;
    } catch (error) {
        console.error("Error fetching characters by image ID:", error);
        throw error;
    }
}
async function verifyCharacter(id, x, y) {
    try {
        const character = await prisma.character.findUnique({
            where: { id },
        });
        if (!character) {
            return false;
        }
        const dx = character.x - x;
        const dy = character.y - y;
        return dx * dx + dy * dy <= 0.035 * 0.035;
    } catch (error) {
        console.error("Error verifying character:", error);
        throw error;
    }
}

async function getRecordsByImageId(imageId) {
    try {
        const records = await prisma.record.findMany({
            where: { imageId },
            orderBy: {
                score: "asc",
                take: 5,
            },
        });
        return records;
    } catch (error) {
        console.error("Error fetching records by image ID:", error);
        throw error;
    }
}
async function writeRecord(imageId, name, score) {
    try {
        const record = await prisma.record.create({
            data: {
                imageId,
                name,
                score,
            },
        });
        return record;
    } catch (error) {
        console.error("Error creating record:", error);
        throw error;
    }
}

module.exports = {
    getAllImages,
    getImageById,
    getCharactersByImageId,
    verifyCharacter,
    getRecordsByImageId,
    writeRecord,
};
