import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedAccounts() {

    const defaultPass = await bcrypt.hash('passwordAdmin', 10);

    await prisma.accounts.createMany({
        data: [
            {
                username: 'root_admin@app',
                password: defaultPass
            }
        ]
    });
}

seedAccounts()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
