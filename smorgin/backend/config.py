import os
import redis

DB_URI = "sqlite:///{}".format(os.path.join(".", "storage", "app.db"))
REDIS_URL = "redis://127.0.0.1:6379"


class AppConfig:
    SECRET_KEY = os.urandom(24).hex()

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = DB_URI

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(REDIS_URL)
