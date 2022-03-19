from flask import Flask, flash, get_flashed_messages, jsonify, session, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session

from core.binance import BinanceCredentials
from config import AppConfig
from models import db, User

app = Flask(__name__)
app.config.from_object(AppConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


def get_formatted_flash_msgs():
    flash_msgs = [
        [category, msg]
        for category, msg in get_flashed_messages(with_categories=True)
    ]
    return flash_msgs


@app.route("/signup", methods=["POST"])
def signup():
    username = request.json["username"]
    password = request.json["password"]

    user_exists = User.query.filter_by(username=username).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists."}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    flash("Your account have been created.", category="success")
    return jsonify({"id": new_user.id, "username": new_user.username}), 200


@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({"error": "User does not exist."}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Credentials are incorrect."}), 401

    session["user_id"] = user.id

    flash("Successfully logged in.", category="success")
    return jsonify({"id": user.id, "username": user.username})


@app.route("/logout", methods=["POST"])
def logout():
    flash("Successfully logged out.", category="success")
    session.pop("user_id")
    return "", 200


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return (
            jsonify(
                {
                    "error": "Unauthorized",
                    "_flashes": get_formatted_flash_msgs(),
                }
            ),
            401,
        )

    user = User.query.filter_by(id=user_id).first()

    return (
        jsonify(
            {
                "id": user.id,
                "username": user.username,
                "_flashes": get_formatted_flash_msgs(),
            }
        ),
        200,
    )


app.add_url_rule(
    "/binance_creds", view_func=BinanceCredentials.as_view("binance_creds")
)

if __name__ == "__main__":
    app.run(debug=True)
