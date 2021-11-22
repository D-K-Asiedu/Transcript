from flask import jsonify, request
from app import app

from app.Otp import Otp
from app.model import model
from app.helper import decode_token, generate_token
from app.decorators import login_required

otp = Otp()
User, Admin = model('mongodb://localhost:27017/')

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
        otp.gen_otp()
        return jsonify({
            "otp": otp.otp,
            "login": False
        })

@app.route("/otp", methods=["POST"])
def get_otp():
    data = request.json
    if data['otp'] == otp.otp:
        User.insert_one({"contact": data["contact"]})
        token = generate_token(data["contact"])
        return jsonify({
            "otp": True,
            "login": True,
            "token": token
            })


@app.route('/request-transcript', methods=['POST'])
@login_required
def request_transcript():
    data = request.json
    user = decode_token(data["token"])
    
    transcript = {
        "first-name":data['first-name'], 
        "middle-name":data['middle-name'], 
        "last-name":data['last-name'],
        "index-number":data['index-number'], 
        "address":data['address'],
        "copies":data['copies'],
        "status": "pending",
        "status-change": "pending"
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