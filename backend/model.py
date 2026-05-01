from sklearn.ensemble import RandomForestClassifier

symptom_list = ["fever", "cold", "allergy"]

X = [
    [1,0,0],
    [0,1,0],
    [0,0,1],
    [1,1,0]
]

y = ["Flu","Cold","Allergy","Flu"]

model = RandomForestClassifier()
model.fit(X,y)

def convert_to_vector(user_input):
    vector = [0]*len(symptom_list)

    for i, symptom in enumerate(symptom_list):
        if symptom in user_input.lower():
            vector[i] = 1

    return vector

def predict_disease_from_text(user_input):
    vector = convert_to_vector(user_input)
    return model.predict([vector])[0]


def predict_with_confidence(user_input):
    vector = convert_to_vector(user_input)
    prediction = model.predict([vector])[0]

    # calculate confidence based on matched symptoms
    matched = sum(vector)
    total = len(vector)

    confidence = int((matched / total) * 100)

    return prediction, confidence