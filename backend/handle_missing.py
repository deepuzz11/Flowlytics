import pandas as pd

def handle_missing_values_in_chunks(file_path, method='drop', chunk_size=10000):
    """
    Handles missing values in the dataframe in chunks.
    
    :param file_path: Path to the dataset
    :param method: Method to handle missing values. Options are 'drop' and 'fill'.
    :param chunk_size: Number of rows per chunk to process
    :return: A DataFrame with missing values handled
    """
    # Initialize the iterator for reading the file in chunks
    chunks = pd.read_csv(file_path, chunksize=chunk_size)
    processed_chunks = []
    
    for chunk in chunks:
        if method == 'drop':
            chunk = chunk.dropna()
        elif method == 'fill':
            chunk = chunk.fillna(chunk.mean())
        else:
            raise ValueError("Invalid method. Use 'drop' or 'fill'.")
        
        processed_chunks.append(chunk)
    
    # Concatenate all chunks after processing
    processed_df = pd.concat(processed_chunks, ignore_index=True)
    
    return processed_df
