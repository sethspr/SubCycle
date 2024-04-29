from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_session import Session
import os

app = Flask(__name__)

app.secret_key = os.environ.get("secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", f"sqlite:///app.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
cors = CORS(app, resources={r"/": {"origins": "http://127.0.0.1:5555"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.json.compact = False

metadata = MetaData(
    naming_convention={
        "fk": "fk%(table_name)s%(column_0_name)s%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)
