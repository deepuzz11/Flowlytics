from sklearn.preprocessing import LabelEncoder
import pandas as pd

def encode_categorical_in_chunks(file_path, chunk_size=10000):
    """
    Encodes categorical variables in the dataset in chunks.
    
    :param file_path: Path to the dataset
    :param chunk_size: Number of rows per chunk to process
    :return: A DataFrame with categorical columns encoded
    """
    label_encoder = LabelEncoder()
    chunks = pd.read_csv(file_path, chunksize=chunk_size)
    processed_chunks = []
    
    for chunk in chunks:
        categorical_cols = chunk.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            chunk[col] = label_encoder.fit_transform(chunk[col])
        processed_chunks.append(chunk)
    
    # Concatenate all chunks after processing
    encoded_df = pd.concat(processed_chunks, ignore_index=True)
    
    return encoded_df
