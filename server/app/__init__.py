from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config["SECRET_KEY"] = "dbc64f33d465539c132aaef055830a5c"
CORS(app)
bcrypt = Bcrypt(app)


from app import views