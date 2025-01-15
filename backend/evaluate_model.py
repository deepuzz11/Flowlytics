from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score, accuracy_score
from sklearn.tree import DecisionTreeRegressor, DecisionTreeClassifier  # Import Decision Trees
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all domains (or specify your React domain)
CORS(app)

# MongoDB setup
app.config["MONGO_URI"] = "mongodb://localhost:27017/flowlytics"  # Adjust this if needed
mongo = PyMongo(app)

def evaluate_model_performance(y_test, y_pred, model_type='linear_regression'):
    metrics = {}
    if model_type == 'linear_regression' or model_type == 'decision_tree_regressor':
        # Regression metrics
        metrics['R2'] = r2_score(y_test, y_pred)
        metrics['Mean Absolute Error'] = mean_absolute_error(y_test, y_pred)
        metrics['Mean Squared Error'] = mean_squared_error(y_test, y_pred)
    elif model_type == 'decision_tree_classifier':
        # Classification metrics
        metrics['Accuracy'] = accuracy_score(y_test, y_pred)
    else:
        raise ValueError("Invalid model type. Choose from 'linear_regression', 'decision_tree_regressor', 'decision_tree_classifier'.")
    
    return metrics

@app.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        data = request.json
        y_test = data.get('y_test')
        y_pred = data.get('y_pred')
        model_type = data.get('model_type', 'linear_regression')

        # Evaluate based on model type
        metrics = evaluate_model_performance(y_test, y_pred, model_type)
        
        # Optionally, save the evaluation result in the database
        result = {'metrics': metrics, 'model_type': model_type}
        mongo.db.model_performance.insert_one(result)
        
        return jsonify({"message": "Model evaluation successful", "metrics": metrics}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Endpoint for training a decision tree regressor or classifier
@app.route('/train_decision_tree', methods=['POST'])
def train_decision_tree():
    try:
        data = request.json
        X_train = data.get('X_train')
        y_train = data.get('y_train')
        model_type = data.get('model_type', 'decision_tree_regressor')

        if model_type == 'decision_tree_regressor':
            model = DecisionTreeRegressor()  # Initialize DecisionTreeRegressor
        elif model_type == 'decision_tree_classifier':
            model = DecisionTreeClassifier()  # Initialize DecisionTreeClassifier
        else:
            raise ValueError("Invalid model type. Use 'decision_tree_regressor' or 'decision_tree_classifier'.")

        # Fit the model
        model.fit(X_train, y_train)

        # Make predictions (you can replace this with actual test data when needed)
        y_pred = model.predict(X_train)  # Use X_train or any new test data here

        # Evaluate the model
        metrics = evaluate_model_performance(y_train, y_pred, model_type)
        
        # Optionally, save the model performance to the database
        result = {'metrics': metrics, 'model_type': model_type}
        mongo.db.model_performance.insert_one(result)

        return jsonify({"message": "Model training and evaluation successful", "metrics": metrics}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
