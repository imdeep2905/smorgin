import json
from binance.client import Client
from binance.exceptions import BinanceAPIException
from . import constants
from flask import request, jsonify, session, flash
from flask.views import MethodView


class BinanceCredentials(MethodView):
    def get(self):
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        data = json.load(open(constants.BINANCE_CREDS_STORE_PATH))

        if data:
            data.pop("secret_key")

        return jsonify(data)

    def post(self):
        try:
            user_id = session.get("user_id")

            if not user_id:
                return jsonify({"error": "Unauthorized"}), 401

            client = Client(
                request.json["api_key"],
                request.json["secret_key"],
                testnet=request.json["testnet"],
            )
            client.get_asset_balance(recvWindow=60000, asset="ETH")
            json.dump(
                request.json,
                open(constants.BINANCE_CREDS_STORE_PATH, "w"),
                indent=4,
            )
            flash("Binance credentials saved.", category="success")
            return jsonify({"msg": "Binance credentials saved."}), 201
        except BinanceAPIException:
            return jsonify({"error": "Invalid Credentials."}), 401
        except Exception:
            return jsonify({"error": "Unexpected error occurred."}), 500

    def delete(self):
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        json.dump(
            {},
            open(constants.BINANCE_CREDS_STORE_PATH, "w"),
            indent=4,
        )
        flash("Binance credentials deleted successfully.", "success")
        return "", 204
