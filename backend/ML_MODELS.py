import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor, DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

def build_model(df, model_type='linear_regression', target_column='target', test_size=0.2):
    """
    Build and train a machine learning model based on the selected type.
    
    :param df: Input DataFrame
    :param model_type: Model to use ('linear_regression', 'decision_tree')
    :param target_column: Column name for the target variable
    :param test_size: Test size fraction for splitting the data
    :return: Trained model, test data, predicted values
    """
    # Prepare the features (X) and target (y)
    X = df.drop(columns=[target_column])
    y = df[target_column]
    
    # Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)

    # Initialize and train the model
    if model_type == 'linear_regression':
        model = LinearRegression()
    elif model_type == 'decision_tree_regressor':
        model = DecisionTreeRegressor(random_state=42)
    elif model_type == 'decision_tree_classifier':
        model = DecisionTreeClassifier(random_state=42)
        # Encode categorical target if classification is used
        label_encoder = LabelEncoder()
        y_train = label_encoder.fit_transform(y_train)
        y_test = label_encoder.transform(y_test)
    else:
        raise ValueError("Invalid model type. Choose from 'linear_regression', 'decision_tree_regressor', 'decision_tree_classifier'.")
    
    # Train the model
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(X_test)
    
    return model, X_test, y_test, y_pred
