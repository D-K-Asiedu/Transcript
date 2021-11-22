from pymongo import MongoClient

def model(uri):
    client = MongoClient(uri)
    db = client["transcript"]

    user = db["user"]
    admin = db["admin"]

    return user, admin