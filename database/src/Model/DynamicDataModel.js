import mongoose from 'mongoose';

const createDynamicSchema = (columns) => {
  const schemaFields = {};
  columns.forEach((col) => {
    schemaFields[col] = { type: mongoose.Schema.Types.Mixed }; // Mixed allows any data type
  });
  return new mongoose.Schema(schemaFields, { timestamps: true });
};

// Get the model, or create one if it doesn't exist
let DynamicModel;
try {
  DynamicModel = mongoose.model('DynamicDataset');
} catch (error) {
  DynamicModel = mongoose.model('DynamicDataset', createDynamicSchema([])); // Create a default schema
}

export default DynamicModel;
