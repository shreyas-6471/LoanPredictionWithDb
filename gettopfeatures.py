import pandas as pd
import joblib
import sys
import sys
import json
import numpy as np
from sklearn.preprocessing import RobustScaler
X = json.loads(sys.argv[1])
arr = np.array(X)
#print(arr)
# Load the KNN model from disk
model = joblib.load('logisticregressionmodel.joblib')
ro_scaler = joblib.load('ro_scaler.joblib')
# Define the input data as a list of lists
#X = [[292222221.251197, 0.689829, -0.447197, 0.666667, -1.0, 0.0, -0.145846, 0.878049, -0.166667, 0.0, 0.248974, 0.195695, 0.0, 0.0]]
#ro_scaler = RobustScaler()

x = ro_scaler.transform(arr)
#print(x)
# Convert the input to a pandas DataFrame
columns=['Current Loan Amount' , 'Credit Score' , 'Annual Income' , 'Years in current job' , 'Home Ownership' , 'Purpose' , 'Monthly Debt' , 'Years of Credit History' , 'Number of Open Accounts' ,'Number of Credit Problems',  'Current Credit Balance', 'Maximum Open Credit', 'Bankruptcies', 'Tax Liens']
df = pd.DataFrame(x, columns=columns)
#X_preprocessed = model.named_steps['preprocessor'].transform(df)
#print(df['Current Loan Amount'])
#print(df)
#print('Going to start predictions')
# Make predictions on the input data
predicted = model.predict(df)
#print('Done predicting!! in script')
# Print the predicted results to stdoutp
retvals=[]
for preds in (predicted):
    retvals.append(preds)
#print(retvals)
#prob = model.predict_proba(df)
#print(prob)
feature_importances = model.named_steps['classifier'].coef_[0]

# Get the indices of the top 3 features
top_feature_indices = np.argsort(np.abs(feature_importances))[::-1][:3]

# Get the names of the top 3 features
top_feature_names = np.array(model.named_steps['preprocessor'].get_feature_names())[top_feature_indices]
print(top_feature_names)
# Print the top 3 features and their corresponding weights
#for name, weight in zip(top_feature_names, feature_importances[top_feature_indices]):
 #   print(f"{name}: {weight}")

# Flush stdout to ensure the output is immediately available to Node.js

sys.stdout.flush()
