import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            const visit = await prisma.visit.findFirst({
                where: {
                    id: Number(id),
                    userId: Number(userId),
                },
            });

            if (!visit) {
                return res.status(404).json({ message: 'Visit not found' });
            }

            res.status(200).json(visit);
        } catch (error) {
            console.error("Error fetching visit:", error);
            res.status(500).json({ message: 'Error fetching visit' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === 'DELETE') {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        try {
            const visit = await prisma.visit.findFirst({
                where: { id: Number(id), userId: Number(userId) },
            });

            if (!visit) {
                return res.status(404).json({ message: 'Visit not found' });
            }

            await prisma.visit.delete({ where: { id: Number(id) } });

            res.status(200).json({ message: 'Visit deleted successfully' });
        } catch (error) {
            console.error("Error deleting visit:", error);
            res.status(500).json({ message: 'Error deleting visit' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
