from sklearn.preprocessing import MinMaxScaler
import pandas as pd

def normalize_data_in_chunks(file_path, chunk_size=10000):
    """
    Normalizes numerical columns in the dataset in chunks.
    
    :param file_path: Path to the dataset
    :param chunk_size: Number of rows per chunk to process
    :return: A DataFrame with normalized numerical columns
    """
    # Initialize the scaler
    scaler = MinMaxScaler()
    chunks = pd.read_csv(file_path, chunksize=chunk_size)
    processed_chunks = []
    
    for chunk in chunks:
        numerical_cols = chunk.select_dtypes(include=['float64', 'int64']).columns
        chunk[numerical_cols] = scaler.fit_transform(chunk[numerical_cols])
        processed_chunks.append(chunk)
    
    # Concatenate all chunks after processing
    normalized_df = pd.concat(processed_chunks, ignore_index=True)
    
    return normalized_df
