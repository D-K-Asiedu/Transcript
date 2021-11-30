from flask import jsonify
from app import app
from datetime import datetime, timedelta

import jwt

def decode_token(token):
    data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
    return data["user"]

def generate_token(user):
    token = jwt.encode({
            "user": user,
            "exp": datetime.utcnow() + timedelta(days=1)
        }, app.config["SECRET_KEY"])

    return token

def format_contact(contact):
    if contact[0] == 0:
        return "+233"+contact[1:]

    elif contact[0] == "+":
        return contact