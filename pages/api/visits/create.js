import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { STATUS, name, gender, dob, address, aadharNumber, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newVisit = await prisma.visit.create({
            data: {
                STATUS,
                name,
                gender,
                dob: new Date(dob),
                address,
                aadharNumber,
                userId: user.id,
            },
        });

        res.status(201).json({ message: 'Visit created successfully', visit: newVisit });
    } catch (error) {
        console.error("Error creating visit:", error);
        res.status(500).json({ message: 'Error creating visit' });
    } finally {
        await prisma.$disconnect();
    }
}
