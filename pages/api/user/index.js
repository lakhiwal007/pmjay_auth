import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, aadharEntries } = req.body;

    // Validate the input
    if (!userId || !Array.isArray(aadharEntries) || aadharEntries.length === 0) {
      return res.status(400).json({
        error: 'Missing required fields: userId or valid aadharEntries array',
      });
    }

    try {
      // Verify or create the user
      let user = await prisma.user.findUnique({
        where: { uid: String(userId) },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            uid: String(userId),
            name: `User_${userId}`, // Default name; adjust as needed
          },
        });
        console.log(`User with ID ${userId} created.`);
      }

      // Add Aadhaar entries
      const createdEntries = await Promise.all(
        aadharEntries.map(async (entry) => {
          const { aadharNo, status } = entry;

          // Validate individual entry
          if (!aadharNo || !status) {
            throw new Error('Each entry must include aadharNo and status.');
          }

          // Check if Aadhaar number already exists
          const existingEntry = await prisma.entry.findUnique({
            where: { aadharNo },
          });

          if (existingEntry) {
            throw new Error(`Aadhaar number ${aadharNo} already exists.`);
          }

          // Create Aadhaar entry
          return prisma.entry.create({
            data: {
              aadharNo,
              status,
              keyId: user.id, // Foreign key reference to the user
            },
          });
        })
      );

      res.status(201).json({
        message: 'Aadhaar entries created successfully.',
        entries: createdEntries,
      });
    } catch (error) {
      console.error('Error adding Aadhaar entries:', error.message || error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    // Validate the input
    if (!userId) {
      return res.status(400).json({ error: 'Missing required field: userId' });
    }

    try {
      // Verify the user exists
      const user = await prisma.user.findUnique({
        where: { uid: String(userId) },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Fetch Aadhaar entries for the user
      const entries = await prisma.entry.findMany({
        where: { keyId: user.id },
        select: {
          id: true,
          aadharNo: true,
          status: true,
        },
      });

      if (entries.length === 0) {
        return res.status(404).json({ error: 'No Aadhaar entries found for this user' });
      }

      res.status(200).json({
        userId: userId,
        entries,
      });
    } catch (error) {
      console.error('Error fetching Aadhaar entries:', error.message || error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
