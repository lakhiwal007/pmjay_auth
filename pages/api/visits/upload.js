import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import multer from 'multer';
import { Readable } from 'stream';
import path from 'path';

const prisma = new PrismaClient();


export const config = {
    api: {
      bodyParser: false,
      logging: {
        fetches: {
          fullUrl: true,
        },
    },
    }
  };
  
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.csv') {
            return cb(new Error('Only CSV files are allowed'));
        }
        cb(null, true);
    },
});

const uploadMiddleware = upload.single('file');

const parseCSV = async (buffer, userId) => {
    return new Promise((resolve, reject) => {
        const visits = [];
        const readableStream = Readable.from(buffer.toString());

        readableStream
            .pipe(csv())
            .on('data', (data) => {
                visits.push({
                    STATUS: data.STATUS,
                    name: data.name,
                    gender: data.gender,
                    dob: new Date(data.dob),
                    address: data.address,
                    aadharNumber: data.aadharNumber,
                    userId: Number(userId),
                });
            })
            .on('end', () => {
                resolve(visits);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Handle file upload using multer middleware
   
    await new Promise((resolve, reject) => {
        uploadMiddleware(req, res, (err) => {
          if (err) {
            console.error("Multer error:", err);
            return reject(err);
          }
          resolve();
        });
      });
    
    const { userId } = req.body;

    // const formData = await req.formData();
    // const file = formData.get("file");
    // const userId = formData.get("userId");

    console.log(userId  , req.file)

    if (!userId || !req.file) {
        return res.status(400).json({ message: 'User ID and CSV file are required' });
    }

    try {

    
        // Parse CSV and prepare data for database
        const visitsData = await parseCSV(req.file.buffer, userId);
    
        const user = await prisma.user.findUnique({ where: { id: Number(userId )} });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const visitsData = await parseCSV(req.file.buffer, user.id);

        const createdVisits = await prisma.visit.createMany({
            data: visitsData,
        });

        res.status(201).json({
            message: 'Visits created successfully',
            count: createdVisits.count,
        });
    } catch (error) {
        console.error("Error uploading visits:", error);
        res.status(500).json({ message: 'Error uploading visits' });
    } finally {
        await prisma.$disconnect();
    }
}
