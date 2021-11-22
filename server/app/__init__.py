from flask import Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "dbc64f33d465539c132aaef055830a5c"

from app import views