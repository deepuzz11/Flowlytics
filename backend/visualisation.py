import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import pandas as pd

def plot_model_performance(metrics, model_type='linear_regression'):
    """
    Plot the performance metrics of the model.
    
    :param metrics: Dictionary containing performance metrics
    :param model_type: Type of model ('linear_regression', 'decision_tree')
    """
    # Display performance metrics
    print(f"Model Evaluation for {model_type}:\n")
    for metric, value in metrics.items():
        print(f"{metric}: {value}")
    
    # Visualize using a bar plot
    metric_names = list(metrics.keys())
    metric_values = list(metrics.values())
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x=metric_names, y=metric_values)
    plt.title(f"Performance Metrics for {model_type}")
    plt.ylabel("Score")
    plt.show()

def plot_feature_importance(model, feature_names, model_type='linear_regression'):
    """
    Plot feature importance (for tree-based models).
    
    :param model: Trained model
    :param feature_names: List of feature names
    :param model_type: Type of model ('linear_regression', 'decision_tree')
    """
    if model_type in ['decision_tree_regressor', 'decision_tree_classifier']:
        importance = model.feature_importances_
        feature_df = pd.DataFrame({'Feature': feature_names, 'Importance': importance})
        feature_df = feature_df.sort_values(by='Importance', ascending=False)
        
        # Plot feature importance
        plt.figure(figsize=(10, 6))
        sns.barplot(x='Importance', y='Feature', data=feature_df)
        plt.title(f"Feature Importance for {model_type}")
        plt.show()

def interactive_scatter_plot(X_test, y_test, y_pred):
    """
    Create an interactive scatter plot using Plotly.
    
    :param X_test: Test set features
    :param y_test: Actual target values
    :param y_pred: Predicted target values
    """
    df = pd.DataFrame({'Actual': y_test, 'Predicted': y_pred})
    fig = px.scatter(df, x='Actual', y='Predicted', title='Actual vs Predicted Values')
    fig.show()
