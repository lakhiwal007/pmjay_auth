import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId  , status} = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {

        const whereCondition = { userId: Number(userId) };
        
        if (status) {
            whereCondition.STATUS = status;  // Only add the status filter if provided
        }

        const visits = await prisma.visit.findMany({
            where: whereCondition,
        });
        console.info("fetching visits:")
        res.status(200).json(visits);
    } catch (error) {
        console.error("Error fetching visits:", error);
        res.status(500).json({ message: 'Error fetching visits' });
    } finally {
        await prisma.$disconnect();
    }
}
