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
                        avatarUrl: "/avatars/wow/illidan.png",
                    },
                    {
                        name: "Anduin Wrynn",
                        x: 0.27,
                        y: 0.28,
                        avatarUrl: "/avatars/wow/anduin.png",
                    },
                    {
                        name: "Gul'dan",
                        x: 0.5,
                        y: 0.18,
                        avatarUrl: "/avatars/wow/guldan.png",
                    },
                    {
                        name: "Alexstrasza",
                        x: 0.64,
                        y: 0.33,
                        avatarUrl: "/avatars/wow/alexstrasza.png",
                    },
                    {
                        name: "Arthas (The Lich King)",
                        x: 0.88,
                        y: 0.25,
                        avatarUrl: "/avatars/wow/arthas.png",
                    },
                    {
                        name: "Sylvanas Windrunner",
                        x: 0.14,
                        y: 0.72,
                        avatarUrl: "/avatars/wow/sylvanas.png",
                    },
                    {
                        name: "Jaina Proudmoore",
                        x: 0.32,
                        y: 0.68,
                        avatarUrl: "/avatars/wow/jaina.png",
                    },
                    {
                        name: "Thrall",
                        x: 0.5,
                        y: 0.64,
                        avatarUrl: "/avatars/wow/thrall.png",
                    },
                    {
                        name: "Alleria Windrunner",
                        x: 0.64,
                        y: 0.69,
                        avatarUrl: "/avatars/wow/alleria.png",
                    },
                    {
                        name: "Tyrande Whisperwind",
                        x: 0.81,
                        y: 0.69,
                        avatarUrl: "/avatars/wow/tyrande.png",
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
                        avatarUrl: "/avatars/lol/jayce.png",
                    },
                    {
                        name: "Viktor",
                        x: 0.23,
                        y: 0.24,
                        avatarUrl: "/avatars/lol/viktor.png",
                    },
                    {
                        name: "Heimerdinger",
                        x: 0.25,
                        y: 0.43,
                        avatarUrl: "/avatars/lol/heimerdinger.png",
                    },
                    {
                        name: "Ekko",
                        x: 0.38,
                        y: 0.24,
                        avatarUrl: "/avatars/lol/ekko.png",
                    },
                    {
                        name: "Jinx",
                        x: 0.48,
                        y: 0.24,
                        avatarUrl: "/avatars/lol/jinx.png",
                    },
                    {
                        name: "Vi",
                        x: 0.58,
                        y: 0.25,
                        avatarUrl: "/avatars/lol/vi.png",
                    },
                    {
                        name: "Caitlyn Kiramman",
                        x: 0.68,
                        y: 0.26,
                        avatarUrl: "/avatars/lol/caitlyn.png",
                    },
                    {
                        name: "Mel Medarda",
                        x: 0.76,
                        y: 0.28,
                        avatarUrl: "/avatars/lol/mel.png",
                    },
                    {
                        name: "Ambessa Medarda",
                        x: 0.87,
                        y: 0.26,
                        avatarUrl: "/avatars/lol/ambessa.png",
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
