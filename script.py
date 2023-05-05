import pandas as pd
import joblib
import sys
import sys
import json
import numpy as np
import eli5
from sklearn.preprocessing import RobustScaler

X = json.loads(sys.argv[1])
arr = np.array(X)

# Load the logistic regression model from disk
model = joblib.load('logisticregressionmodel.joblib')
ro_scaler = joblib.load('ro_scaler.joblib')
transformer=joblib.load('transformer.joblib')
# Preprocess the input data
x = ro_scaler.transform(arr)
df = pd.DataFrame(x, columns=['Current Loan Amount', 'Credit Score', 'Annual Income', 'Years in current job', 'Home Ownership', 'Purpose', 'Monthly Debt', 'Years of Credit History', 'Number of Open Accounts', 'Number of Credit Problems', 'Current Credit Balance', 'Maximum Open Credit', 'Bankruptcies', 'Tax Liens'])
#transformer = model.named_steps['preprocessor']

#preprocessed_feature_names = transformer.named_transformers_['num'].get_feature_names().tolist() + transformer.named_transformers['cat'].get_feature_names().tolist()
#preprocessed_feature_names = transformer.named_transformers_['num'].get_feature_names().tolist() + transformer.named_transformers_['cat'].get_feature_names().tolist()
#df.columns = preprocessed_feature_names

# Make predictions on the input data
predicted = model.predict(df)
values = []
retvals = []
for preds in predicted:
    retvals.append(preds)
values.append(retvals)
prob = model.predict_proba(df)
values.append(prob.tolist())

# Calculate feature importance and get top 3 features
#feature_weights = eli5.explain_weights(model, feature_names=preprocessed_feature_names)
#top_features = [x.feature for x in feature_weights.feature_importances[:3]]
#values.append(top_features)

# Print the results to stdout
print(values)
sys.stdout.flush()
