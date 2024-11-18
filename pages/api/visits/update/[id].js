// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     if (req.method !== 'PUT') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const { id, STATUS, name, gender, dob, address, aadharNumber, userId } = req.body;

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

//         const updatedVisit = await prisma.visit.update({
//             where: { id: Number(id) },
//             data: {
//                 STATUS,
//                 name,
//                 gender,
//                 dob: new Date(dob),
//                 address,
//                 aadharNumber,
//             },
//         });

//         res.status(200).json({ message: 'Visit updated successfully', visit: updatedVisit });
//     } catch (error) {
//         console.error("Error updating visit:", error);
//         res.status(500).json({ message: 'Error updating visit' });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
