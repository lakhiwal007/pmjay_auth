// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     if (req.method !== 'DELETE') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const { userId  , id} = req.body;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//     }

//     try {
//         const visit = await prisma.visit.findFirst({
//             where: { id: Number(id), userId: Number(userId) },
//         });

//         if (!visit) {
//             return res.status(404).json({ message: 'Visit not found' });
//         }

//         await prisma.visit.delete({ where: { id: Number(id) } });

//         res.status(200).json({ message: 'Visit deleted successfully' });
//     } catch (error) {
//         console.error("Error deleting visit:", error);
//         res.status(500).json({ message: 'Error deleting visit' });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
