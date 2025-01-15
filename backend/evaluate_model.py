from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.metrics import r2_score, accuracy_score

def evaluate_model_performance(y_test, y_pred, model_type='linear_regression'):
    """
    Evaluate model performance using different metrics based on the model type.
    
    :param y_test: Actual values for the test set
    :param y_pred: Predicted values from the model
    :param model_type: Type of model ('linear_regression', 'decision_tree')
    :return: A dictionary of evaluation metrics
    """
    metrics = {}
    
    if model_type == 'linear_regression' or model_type == 'decision_tree_regressor':
        # For regression models
        metrics['R2'] = r2_score(y_test, y_pred)
        metrics['Mean Absolute Error'] = mean_absolute_error(y_test, y_pred)
        metrics['Mean Squared Error'] = mean_squared_error(y_test, y_pred)
    
    elif model_type == 'decision_tree_classifier':
        # For classification models
        metrics['Accuracy'] = accuracy_score(y_test, y_pred)
    else:
        raise ValueError("Invalid model type. Choose from 'linear_regression', 'decision_tree_regressor', 'decision_tree_classifier'.")
    
    return metrics
