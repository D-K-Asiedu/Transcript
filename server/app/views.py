from time import time
from typing import BinaryIO
from bson.objectid import ObjectId
from flask import jsonify, request
from app import app
from app import bcrypt
import time

from app.Otp import Otp
from app.model import model
from app.helper import decode_token, generate_token
from app.decorators import login_required

otp = Otp()
User, Admin = model("mongodb+srv://af:codename01@cluster0.lwkwv4u.mongodb.net/?retryWrites=true&w=majority")

@app.route("/", methods=["POST"])
def contact():
    data = request.json

    user = User.find_one({"contact": data["contact"]})
    token = generate_token(data["contact"])
    if user:
        return jsonify({
            "login": True,
            "token": token
        })

    else:
        otp.get_otp(data["contact"])
        return jsonify({
            "otp": otp.otp,
            "login": False
        })

@app.route("/otp", methods=["POST"])
def get_otp():
    data = request.json
    if otp.verify_otp(int(data["otp"])) == True:
        User.insert_one({"contact": data["contact"]})
        token = generate_token(data["contact"])
        
        return jsonify({
            "otp": True,
            "login": True,
            "token": token
            })

    else:
        return jsonify({"otp": False})


@app.route('/request-transcript', methods=['POST'])
@login_required
def request_transcript():
    data = request.json
    user = decode_token(data["token"])
    
    try:
        transcript = {
            "first-name":data['first-name'], 
            "middle-name":data['middle-name'], 
            "last-name":data['last-name'],
            "index-number":data['index-number'], 
            "address":data['address'],
            "copies":data['copies'],
            "status": "pending",
            "status-change": "pending",
            "active": False
        }

    except:
        transcript = {
            "first-name":data['first-name'], 
            "middle-name": "", 
            "last-name":data['last-name'],
            "index-number":data['index-number'], 
            "address":data['address'],
            "copies":data['copies'],
            "status": "pending",
            "status-change": "pending",
            "active": False
        }

    User.update_one({"contact": user}, {"$push":{"transcripts": transcript}})

    return jsonify({"msg": "request successful"})

@app.route('/transcripts', methods=["POST"])
@login_required
def transcript():
    data = request.json
    user = decode_token(data["token"])

    user = User.find_one({"contact": user})

    transcripts = []
    for index,transcript in enumerate(user["transcripts"]):
        transcript_ = {
            "id": index+1,
            "first_name": transcript["first-name"],
            "middle_name": transcript["middle-name"],
            "last_name": transcript["last-name"],
            "index_number": transcript["index-number"],
            "copies": transcript["copies"],
            "address": transcript["address"],
            "status": transcript["status"]
        }
        transcripts.append(transcript_)

    return jsonify(transcripts)

@app.route("/transcript/pay", methods=["POST", "GET"])
def pay_transcripts():
    data = request.json

    return f"<h1>pay <a href='#'>here</a></h1>"

@app.route("/transcript/activate", methods=["POST"])
@login_required
def activate_transcript():
    data = request.json

    contact = decode_token(data["token"])
    User.update_one({"contact": contact}, {"$set": {"transcripts."+ str(data["id"]-1) + ".active": True}})

    return jsonify({"msg": "set to active successfully"})


@app.route("/admin/register", methods=["POST"])
def register():
    data = request.json

    admin = Admin.find_one({"email": data["email"]})

    if admin:
        return jsonify({"msg": "email already exists"})

    else:
        Admin.insert_one(data)
        admin = Admin.find_one({"email": data["email"]})

        return jsonify({"id": str(admin["_id"]), "register": True})

@app.route("/admin/set-password", methods=["POST"])
def set_password():
    data = request.json

    pw_hash = bcrypt.generate_password_hash(data["password"])
    Admin.update_one({"_id": ObjectId(data["id"])}, {"$set": {"password": pw_hash}})

    return jsonify({"msg": "registration complete"})

@app.route("/admin/login", methods=["POST"])
def login():
    data = request.json

    admin = Admin.find_one({"email": data["email"]})

    if admin:
        if bcrypt.check_password_hash(admin["password"], data["password"]):
            token = generate_token(admin["email"])
            print(token)
            return jsonify({
                "admin": token,
                "login": True,
                "type": admin["type"]
            })

        else:
            return jsonify({"msg": "incorrect password"})

    else:
        return jsonify({"msg": "account does not exist"})

@app.route("/admin/transcripts", methods=["POST"])
@login_required
def admin_transcripts():
    users = User.find({})

    transcripts = []
    for user in users:
        for index,transcript in enumerate(user["transcripts"]):
            transcript_ = {
                "key": index+1,
                "user": str(user["_id"]),
                "name": f"{transcript['first-name']} {transcript['middle-name']} {transcript['last-name']}",
                "index_number": transcript["index-number"],
                "copies": transcript["copies"],
                "status": transcript["status"],
                "contact": user["contact"]
            }
            transcripts.append(transcript_)

    return jsonify(transcripts)

@app.route("/admin/set-status", methods=["POST"])
@login_required
def set_status():
    data = request.json

    User.update_one({"_id": ObjectId(data["user"])}, {"$set": {"transcripts."+ str(data["id"]-1) + ".status": data["status"]}})

    return jsonify({"msg": "success"})

@app.route("/status-change", methods=["POST"])
@login_required
def status_change():
    data = request.json

    contact = decode_token(data["token"])
    
    while True:
        time.sleep(0.5)

        user = User.find_one({"contact": contact})
        changed = []
        changed.clear()
        for index,transcript in enumerate(user["transcripts"]):
            if transcript["status"] != transcript["status-change"]:
                transcript_ = {
                "id": index+1,
                "name": f"{transcript['first-name']} {transcript['middle-name']} {transcript['last-name']}",
                "index_number": transcript["index-number"],
                "copies": transcript["copies"],
                "status": transcript["status"],
                "contact": user["contact"]
            }
                changed.append(transcript_)

        if len(changed) > 0:
            return jsonify(changed)


@app.route("/record-change", methods=["POST"])
@login_required
def record_change():
    data = request.json
    contact = decode_token(data["token"])
    user = User.find_one({"contact": contact})

    for d in data["ids"]:
        User.update_one({"contact": contact}, {"$set": {"transcripts."+ str(d-1) + ".status-change": user["transcripts"][d-1]["status"]}})

    return jsonify({"msg": "done"})

    


