from flask import request, jsonify
from functools import wraps
from app import app

import jwt

def login_required(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        token = request.json["token"]

        if not token:
            return jsonify({"msg": "missing token"})

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
        except Exception as e:
            return jsonify({"msg": str(e)})

        return func(*args, **kwargs)
    
    return wrapped
            