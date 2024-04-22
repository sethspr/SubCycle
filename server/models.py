from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from sqlalchemy.ext.hybrid import hybrid_property
# from config import db, bcrypt

db = SQLAlchemy()

class User(db.model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    #add relationship

    #add serialization rules

    #password encryption with bcrypt
    #@hybrid_property
    #@password.setter

class Subscription(db.model, SerializerMixin):
    __tablename__='subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sub_name = db.Column(db.String)
    description = db.Column(db.String)
    amount = db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point
    due_date = db.Column(db.String)

    #add relationship

    #add seralization rules

class EscrowAccount(db.model, SerializerMixin):
    __tablename__='escrow_accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    balance =db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point

class Transaction(db.model, SerializerMixin):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    escrow_id = db.Column(db.Integer, db.ForeignKey('escrow_accounts.id'))
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'))
    amount = db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point
    date = db.Column(db.DateTime, serve_defualt = db.func.now())