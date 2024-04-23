from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from sqlalchemy.ext.hybrid import hybrid_property
# from config import db, bcrypt

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    #add relationship
    subscriptions = db.relationship('Subscription', back_populates='user')
    escrow_accounts = db.relationship('EscrowAccount', back_populates='user')
    
    #add serialization rules
    serialize_rules = ['-subscriptions.user', '-escrow_accounts.user']

    #password encryption with bcrypt
    #@hybrid_property
    #@password.setter

class Subscription(db.Model, SerializerMixin):
    __tablename__='subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sub_name = db.Column(db.String)
    description = db.Column(db.String)
    amount = db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point
    due_date = db.Column(db.String)

    #add relationship
    users = db.relationship('User', back_populates='subscriptions')
    #add seralization rules
    serialize_rules = ['=users.subscriptions']

class EscrowAccount(db.Model, SerializerMixin):
    __tablename__='escrow_accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    balance =db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point

    users = db.relationship('User', back_populates='escrow_accounts')

    serialize_rules = ['-users.escrow_accounts']

class Transaction(db.Model, SerializerMixin):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    escrow_id = db.Column(db.Integer, db.ForeignKey('escrow_accounts.id'))
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'))
    amount = db.Column(db.Decimal(10, 2)) #10 digits total, 2 after decimal point
    date = db.Column(db.DateTime, server_default = db.func.now())

    escrow_accounts = db.relationship('EscrowAccount', back_populates='transactions')
    subscriptions = db.relationship('Subscription', back_populates='transactions')

    serialize_rules = ['-escrow_accounts.transactions', '-subscriptions.transactions']