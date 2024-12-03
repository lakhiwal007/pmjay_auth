import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  try {
    // Get the 'id' from the query params or default to '1'
    const { id } = req.query;
    let pathToFile = 'files/release.apk';

    // Adjust the file path if needed

    if (id === 'sbx') {
      pathToFile = 'sbx/pmjay_offline_app.apk'; // You can change this based on the query 'id' or some condition.
    }else if (id === 'prod') {
        pathToFile = 'prod/pmjay_offline_app.apk'; // You can change this based on the query 'id' or some condition.
    }   

    console.log(pathToFile)
    
    // Define the full path to the file (adjust this based on your actual file structure)
    const filePath = path.resolve('.', pathToFile);

    // Check if the file exists before serving
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file to send it as a download response
    const fileBuffer = fs.readFileSync(filePath);

    // Set headers to initiate a download
    res.setHeader('Content-Type', 'application/force-download');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    res.setHeader('X-Sendfile', pathToFile);
    res.setHeader('Content-Length', fileBuffer.length);

    // Send the file buffer as response
    res.status(200).send(fileBuffer);
  } catch (err) {
    console.error('Error during file download:', err);
    res.status(400).json({ error: err.message });
  }
}
