from enum import unique
from flask import Flask, json, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from random import randint
from secrets import token_hex
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///transcript.db'
db = SQLAlchemy(app)
CORS(app)

otp = None

class User(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    contact = db.Column(db.String(10), unique=True, nullable=False)
    token = db.Column(db.String(100), unique=True, nullable=False)
    transcript = db.relationship('Transcript', backref='user', lazy=True)

class Transcript(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    middle_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80), nullable=False)
    index_number = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(80), nullable=False)
    copies = db.Column(db.Integer, nullable=False, default=1)
    status = db.Column(db.Integer, nullable=False, default="pending")
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False)

class Admin(db.Model):
    id  = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    middle_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    type = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(80))






@app.route("/", methods=['POST'])
def contact():
    global otp
    data = request.json

    user = User.query.filter_by(contact=data['contact']).first()

    if user:
        return jsonify({"login": True, "token": user.token})

    else:
        otp = randint(10000, 99999)
        return jsonify({"otp": otp, "login": False})

@app.route("/otp", methods=["POST"])
def otp():
    data = request.json
    if int(data['otp']) == int(otp):
        token = token_hex(16)
        user = User(contact=data['contact'], token=token)
        db.session.add(user)
        db.session.commit()

        return jsonify({"otp": True,"login": True, "token": token})
    else:
        return jsonify({"otp": False})

@app.route('/request-transcript', methods=['POST'])
def request_transcript():
    data = request.json

    user = User.query.filter_by(token=data['token']).first()

    if user:
        transcript = Transcript(
            first_name=data['first-name'], 
            middle_name=data['middle-name'], 
            last_name=data['last-name'],
            index_number=data['index-number'], 
            address = data['address'],
            copies = data['copies'],
            user_id = user.id
            )

        db.session.add(transcript)
        db.session.commit()

        return jsonify({"msg": "request successful"})

    else:
        return jsonify({"msg": "incorect token"})
        

@app.route('/transcripts', methods=["POST"])
def transcript():
    data = request.json

    user = User.query.filter_by(token=data['token']).first()
    data = Transcript.query.filter_by(user_id=user.id)
    transcripts = []
    for transcript in data:
        transcript_ = {
            "first_name": transcript.first_name,
            "middle_name": transcript.middle_name,
            "last_name": transcript.last_name,
            "index_number": transcript.index_number,
            "copies": transcript.copies,
            "address": transcript.address,
            "status": transcript.status
        }
        transcripts.append(transcript_)

    return jsonify(transcripts)

@app.route("/admin/register", methods=["POST"])
def register():
    data = request.json

    admin = Admin.query.filter_by(email=data["email"]).first()

    if admin:
        return jsonify({"msg": "email exists"})

    else:
        try:
            admin = Admin(
                first_name=data["first-name"],
                middle_name=data["middle-name"],
                last_name=data["last-name"],
                email = data["email"],
                type = data["type"]
            )

        except:
            admin = Admin(
                first_name=data["first-name"],
                last_name=data["last-name"],
                email = data["email"],
                type = data["type"]
            )

        db.session.add(admin)
        db.session.commit()

        admin = Admin.query.filter_by(email=data["email"]).first()
        return jsonify({"id":  admin.id, "register": True})

@app.route("/admin/set-password", methods=["POST"])
def set_password():
    data = request.json

    admin = Admin.query.get(data["id"])
    admin.password = data["password"]
    db.session.commit()

    return jsonify({"msg":"registration complete"})

@app.route("/admin/login", methods=["POST"])
def login():
    data = request.json

    admin = Admin.query.filter_by(email=data["email"]).first()

    if admin:
        if data["password"] == admin.password:
            return jsonify({
                "admin": admin.id,
                "login": True,
                "type": admin.type
                })

        else:
            return jsonify({"msg": "incorrect password"})

    else:
        return jsonify({"msg": "account does not exist"})

@app.route("/admin/transcripts",)
def admin_transcripts():
    data = Transcript.query.all()

    transcripts = []
    for transcript in data:
        transcript_ = {
            "key": transcript.id,
            "name": f"{transcript.first_name} {transcript.middle_name} {transcript.last_name}",
            "indexNumber": transcript.index_number,
            "copies": transcript.copies,
            "status": transcript.status,
            "contact": transcript.user.contact

        }
        transcripts.append(transcript_)

    return jsonify(transcripts)

@app.route("/admin/set-status", methods=["POST"])
def set_status():
    data = request.json

    transcript = Transcript.query.get(data["id"])
    transcript.status = data["status"]
    db.session.commit()

    return jsonify({"msg":"Success"})





if __name__ == "__main__":
    app.run(debug=True)