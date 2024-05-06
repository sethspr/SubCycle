from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import bcrypt, db


class User(db.Model, SerializerMixin):
    __tablename__='users'

    id = db.Column(db.Integer, primary_key=True)
    escrow_id = db.Column(db.Integer, unique=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, new_password):
        pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
        self.password_hash = pass_hash.decode('utf-8')

    def authenticate(self, password):
        if password is not None:
            return bcrypt.check_password_hash(self.password_hash, password.encode('utf-8'))
        return False

    #add relationship
    subscriptions = db.relationship('Subscription', back_populates='user')
    escrow_account = db.relationship('EscrowAccount', back_populates='user', uselist=False)
    transactions = db.relationship('Transaction', back_populates='user')
    
    #add serialization rules
    serialize_rules = ['-subscriptions', '-escrow_account', '-password', '-transactions']

class EscrowAccount(db.Model, SerializerMixin):
    __tablename__='escrow_account'

    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Float)
    subscriptions = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='escrow_account')

    serialize_rules = ['-user.escrow_account']

class Service(db.Model, SerializerMixin):
    __tablename__='services'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String)
    description = db.Column(db.String)
    amount = db.Column(db.Float)


    subscriptions = db.relationship('Subscription', back_populates='service')

    serialize_rules = ['-subscriptions']

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


class Transaction(db.Model, SerializerMixin):
    __tablename__='transactions'

    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    transaction_type = db.Column(db.String)
    transaction_amount = db.Column(db.Float)
    date = db.Column(db.DateTime, server_default = db.func.now())

    
    subscriptions = db.relationship('Subscription', back_populates='transactions')
    user = db.relationship('User', back_populates='transactions')
    serialize_rules = ['-subscriptions']

