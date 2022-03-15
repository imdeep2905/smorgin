from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(
        db.String(32),
        primary_key=True,
        unique=True,
        default=lambda: uuid4().hex,
    )
    username = db.Column(db.String(69), unique=True)
    password = db.Column(db.Text, nullable=False)
