const dotenv = require('dotenv');
const {PrismaClient} = require('@prisma/client');

const envFileObj = {
    dev: '.env.dev',
    test: '.env.test',
    prod: '.env.prod',
};
const envPath = `../${envFileObj[process.env.NODE_ENV]}`;

dotenv.config({path: envPath});

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.$queryRaw`
        TRUNCATE TABLE users RESTART IDENTITY CASCADE;
    `
    await prisma.taskStatus.deleteMany();
    await prisma.task.deleteMany();
    await prisma.$queryRaw`
        TRUNCATE TABLE tasks RESTART IDENTITY CASCADE;
    `
    await prisma.status.deleteMany();
    await prisma.$queryRaw`
        TRUNCATE TABLE status RESTART IDENTITY CASCADE;
    `
}

main();
