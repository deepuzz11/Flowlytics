from flask import Flask, jsonify
from flask_cors import CORS
import pymongo
import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

app = Flask(__name__)
CORS(app)  # Enable CORS to allow communication with React frontend

# MongoDB client connection
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["flowlytics"]  # Replace with your database name
collection = db["flowlytics"]  # Replace with your collection name

# Fetch data from MongoDB
def fetch_data_from_mongo():
    data = list(collection.find())  # Fetch all documents
    df = pd.DataFrame(data)  # Convert MongoDB data to Pandas DataFrame
    return df

# Handle Missing Values (Fill or Drop)
@app.route('/api/data-cleaning/missing-values', methods=['POST'])
def handle_missing_values():
    df = fetch_data_from_mongo()
    df = df.fillna(df.mean())  # Handle missing values (fill with mean)
    return jsonify({"message": "Missing values handled successfully!"}), 200

# Normalize Data (Min-Max Scaling)
@app.route('/api/data-cleaning/normalize-data', methods=['POST'])
def normalize_data():
    df = fetch_data_from_mongo()
    
    # Ensure there are numerical columns to normalize
    numerical_cols = df.select_dtypes(include=['float64', 'int64']).columns
    if numerical_cols.empty:
        return jsonify({"message": "No numerical data to normalize!"}), 400

    # Apply Min-Max Scaling only to numerical columns
    scaler = MinMaxScaler()
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    # Optionally, save the normalized data back to MongoDB or return success
    # collection.update_many({}, {"$set": df.to_dict("records")})

    return jsonify({"message": "Data normalization completed!"}), 200


# Encode Categorical Variables (Label Encoding)
@app.route('/api/data-cleaning/encode-categorical', methods=['POST'])
def encode_categorical():
    df = fetch_data_from_mongo()
    label_encoder = LabelEncoder()
    categorical_cols = df.select_dtypes(include=['object']).columns
    for col in categorical_cols:
        df[col] = label_encoder.fit_transform(df[col])
    return jsonify({"message": "Categorical variables encoded!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # You can change the port if needed
