const prisma = require("../db/client");

// Update character coordinates in the database
// This script updates the x and y coordinates of specific characters in the database.
async function updateCoordinates() {
    try {
        console.log("Start updating character x/y coordinates...");
        const coordinateUpdates = [
            { name: "Illidan Stormrage", newX: 0.21, newY: 0.32 },
            { name: "Anduin Wrynn", newX: 0.37, newY: 0.23 },
            { name: "Gul'dan", newX: 0.51, newY: 0.18 },
            { name: "Alexstrasza", newX: 0.63, newY: 0.3 },
            { name: "Arthas (The Lich King)", newX: 0.8, newY: 0.27 },
            { name: "Sylvanas Windrunner", newX: 0.13, newY: 0.58 },
            { name: "Jaina Proudmoore", newX: 0.36, newY: 0.52 },
            { name: "Thrall", newX: 0.52, newY: 0.36 },
            { name: "Alleria Windrunner", newX: 0.65, newY: 0.58 },
            { name: "Tyrande Whisperwind", newX: 0.79, newY: 0.52 },
            { name: "Jayce Talis", newX: 0.2, newY: 0.16 },
            { name: "Viktor", newX: 0.26, newY: 0.19 },
            { name: "Heimerdinger", newX: 0.3, newY: 0.65 },
            { name: "Ekko", newX: 0.37, newY: 0.2 },
            { name: "Jinx", newX: 0.46, newY: 0.19 },
            { name: "Vi", newX: 0.56, newY: 0.17 },
            { name: "Caitlyn Kiramman", newX: 0.64, newY: 0.17 },
            { name: "Mel Medarda", newX: 0.71, newY: 0.2 },
            { name: "Ambessa Medarda", newX: 0.79, newY: 0.17 },
        ];

        for (const update of coordinateUpdates) {
            const updated = await prisma.character.updateMany({
                where: { name: update.name },
                data: {
                    x: update.newX,
                    y: update.newY,
                },
            });
            console.log(
                `${update.name} update completed, new coordinates x=${updated.x}, y=${updated.y}`
            );
        }

        console.log("All character coordinates updated successfully.");
    } catch (error) {
        console.error("Error updating coordinates: ", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

updateCoordinates();
