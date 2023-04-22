import pandas as pd
import joblib
import sys
import sys
import json

X = json.loads(sys.argv[1])
#print(X)
# Load the KNN model from disk
model = joblib.load('modelknn.joblib')

# Define the input data as a list of lists
#X = [[292222221.251197, 0.689829, -0.447197, 0.666667, -1.0, 0.0, -0.145846, 0.878049, -0.166667, 0.0, 0.248974, 0.195695, 0.0, 0.0]]

# Convert the input to a pandas DataFrame
columns = ['Current Loan Amount', 'Annual Income', 'Monthly Debt', 'Years of Credit History', 'Number of Open Accounts',
           'Current Credit Balance', 'Maximum Open Credit', 'Years in current job', 'Home Ownership', 'Purpose',
           'Number of Credit Problems', 'Bankruptcies', 'Tax Liens', 'Credit Ranges']
df = pd.DataFrame(X, columns=columns)
#print(df)
#print('Going to start predictions')
# Make predictions on the input data
predicted = model.predict(df)
#print('Done predicting!! in script')
# Print the predicted results to stdoutp
retvals=[]
for preds in (predicted):
    retvals.append(preds)
print(retvals)


# Flush stdout to ensure the output is immediately available to Node.js

sys.stdout.flush()
