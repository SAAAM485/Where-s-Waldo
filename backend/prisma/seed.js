const prisma = require("../db/client");

async function main() {
    console.log("Seeding...");
    await prisma.image.create({
        data: {
            name: "wow",
            url: "/images/wow.webp",
            characters: {
                create: [
                    {
                        name: "Illidan Stormrage",
                        x: 0.14,
                        y: 0.25,
                        avatarUrl: "/images/wow/illidan.png",
                    },
                    {
                        name: "Anduin Wrynn",
                        x: 0.27,
                        y: 0.28,
                        avatarUrl: "/images/wow/anduin.png",
                    },
                    {
                        name: "Gul'dan",
                        x: 0.5,
                        y: 0.18,
                        avatarUrl: "/images/wow/guldan.png",
                    },
                    {
                        name: "Alexstrasza",
                        x: 0.64,
                        y: 0.33,
                        avatarUrl: "/images/wow/alexstrasza.png",
                    },
                    {
                        name: "Arthas (The Lich King)",
                        x: 0.88,
                        y: 0.25,
                        avatarUrl: "/images/wow/arthas.png",
                    },
                    {
                        name: "Sylvanas Windrunner",
                        x: 0.14,
                        y: 0.72,
                        avatarUrl: "/images/wow/sylvanas.png",
                    },
                    {
                        name: "Jaina Proudmoore",
                        x: 0.32,
                        y: 0.68,
                        avatarUrl: "/images/wow/jaina.png",
                    },
                    {
                        name: "Thrall",
                        x: 0.5,
                        y: 0.64,
                        avatarUrl: "/images/wow/thrall.png",
                    },
                    {
                        name: "Alleria Windrunner",
                        x: 0.64,
                        y: 0.69,
                        avatarUrl: "/images/wow/alleria.png",
                    },
                    {
                        name: "Tyrande Whisperwind",
                        x: 0.81,
                        y: 0.69,
                        avatarUrl: "/images/wow/tyrande.png",
                    },
                ],
            },
        },
    });

    await prisma.image.create({
        data: {
            name: "lol",
            url: "/images/lol.jpg",
            characters: {
                create: [
                    {
                        name: "Jayce Talis",
                        x: 0.1,
                        y: 0.25,
                        avatarUrl: "/images/lol/jayce.png",
                    },
                    {
                        name: "Viktor",
                        x: 0.23,
                        y: 0.24,
                        avatarUrl: "/images/lol/viktor.png",
                    },
                    {
                        name: "Heimerdinger",
                        x: 0.25,
                        y: 0.43,
                        avatarUrl: "/images/lol/heimerdinger.png",
                    },
                    {
                        name: "Ekko",
                        x: 0.38,
                        y: 0.24,
                        avatarUrl: "/images/lol/ekko.png",
                    },
                    {
                        name: "Jinx",
                        x: 0.48,
                        y: 0.24,
                        avatarUrl: "/images/lol/jinx.png",
                    },
                    {
                        name: "Vi",
                        x: 0.58,
                        y: 0.25,
                        avatarUrl: "/images/lol/vi.png",
                    },
                    {
                        name: "Caitlyn Kiramman",
                        x: 0.68,
                        y: 0.26,
                        avatarUrl: "/images/lol/caitlyn.png",
                    },
                    {
                        name: "Mel Medarda",
                        x: 0.76,
                        y: 0.28,
                        avatarUrl: "/images/lol/mel.png",
                    },
                    {
                        name: "Ambessa Medarda",
                        x: 0.87,
                        y: 0.26,
                        avatarUrl: "/images/lol/ambessa.png",
                    },
                ],
            },
        },
    });

    console.log("Seeding completed.");
    await prisma.$disconnect();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
