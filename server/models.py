from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime
# from sqlalchemy.ext.hybrid import hybrid_property
# from config import db, bcrypt

metadata = MetaData(
    naming_convention={
        "fk": "fk%(table_name)s%(column_0_name)s%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

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
    serialize_rules = ['-subscriptions', '-escrow_accounts', '-password']


    #password encryption with bcrypt
    #@hybrid_property
    #@password.setter

class Subscription(db.Model, SerializerMixin):
    __tablename__='subscriptions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    due_date = db.Column(db.Integer)


    #add relationship
    user = db.relationship('User', back_populates='subscriptions')
    #add transaction relationship
    transactions = db.relationship('Transaction', back_populates='subscriptions')
    #add services relationship
    service = db.relationship('Service', back_populates='subscriptions')

    #add seralization rules
    serialize_rules = ['-user.subscriptions', '-transactions.subscriptions', '-service.subscriptions']

class EscrowAccount(db.Model, SerializerMixin):
    __tablename__='escrow_accounts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    balance = db.Column(db.Float)

    user = db.relationship('User', back_populates='escrow_accounts')
    transactions = db.relationship('Transaction', back_populates='escrow_account')

    serialize_rules = ['-user.escrow_accounts', '-transactions.escrow_account']

class Transaction(db.Model, SerializerMixin):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    escrow_id = db.Column(db.Integer, db.ForeignKey('escrow_accounts.id'))
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'))
    amount = db.Column(db.Float)
    date = db.Column(db.DateTime, server_default = db.func.now())

    escrow_account = db.relationship('EscrowAccount', back_populates='transactions')
    subscriptions = db.relationship('Subscription', back_populates='transactions')

    serialize_rules = ['-escrow_account', '-subscriptions']

class Service(db.Model, SerializerMixin):
    __tablename__='services'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    description = db.Column(db.String)
    amount = db.Column(db.Float)


    subscriptions = db.relationship('Subscription', back_populates='service')

    serialize_rules = ['-subscriptions']