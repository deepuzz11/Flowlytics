// controllers/uploadController.js

import fs from 'fs';
import csvParser from 'csv-parser';
import mongoose from 'mongoose';
// Helper function to create dynamic schema based on CSV columns
const createDynamicSchema = (columns) => {
  const schemaFields = {};
  columns.forEach((col) => {
    schemaFields[col] = { type: mongoose.Schema.Types.Mixed }; // Mixed allows any data type
  });
  return new mongoose.Schema(schemaFields, { timestamps: true });
};

export const uploadCSV = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const results = [];
  const columns = [];

  // Start parsing the CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('headers', (headerList) => {
      columns.push(...headerList);
    })
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', async () => {
      try {
        // Check if the model already exists, if not, create it
        let DynamicModel;
        try {
          DynamicModel = mongoose.model('DynamicDataset');
        } catch (error) {
          // If the model does not exist, create it
          DynamicModel = mongoose.model('DynamicDataset', createDynamicSchema(columns));
        }

        await DynamicModel.insertMany(results);

        // Send success response
        res.status(200).json({
          message: 'File uploaded and data inserted successfully!',
          dataset: results,
          columns: columns,
        });
      } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Error processing file' });
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ message: 'Error processing file' });
    });
};

export const deleteDataset = async (req, res) => {
    try {
      // Check if the model exists
      const DynamicModel = mongoose.models.DynamicDataset || mongoose.model('DynamicDataset', createDynamicSchema([]));
  
      // Delete all documents from the DynamicDataset collection
      const result = await DynamicModel.deleteMany({});
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No datasets found to delete' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'All datasets deleted successfully!' });
    } catch (error) {
      console.error('Error deleting dataset:', error);
      res.status(500).json({ message: 'Error deleting datasets' });
    }
  };



  