from flask import Flask, request, session, jsonify
from models import db, User, Subscription, EscrowAccount, Transaction, Service
# from config import app, db
import os
from flask_migrate import Migrate;

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)


@app.route('/')
def root():
    return '<h1>SubCycle</h1>'

@app.route('/users', methods=['GET', 'POST'])
def all_users():

    if request.method == 'GET':
        users_obj = User.query.all()

        users_dict = []
        for user in users_obj:
            users_dict.append(user.to_dict())

        return users_dict, 200
    
    elif request.method == 'POST':
        json = request.get_json()
        is_duplicate = User.query.filter_by(username=json['username']).first()
        if is_duplicate:
            return {'Error': f'{is_duplicate} is already registered, please choose another username'}
        
        new_user = User(
            username=json.get('username'), 
            password=json.get('password'), 
            email=json.get('email')
        )
        
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201


@app.route('/user/<string:username>', methods=['GET'])
def user_profile(username):
    user = User.query.filter_by(username=username).first()

    if user:
        return user.to_dict(), 200
    else:
        return {'Error': 'Username does not exist'}, 404

@app.route('/user/<int:id>', methods=['GET'])
def user_by_id(id):
    user_id = User.query.filter(User.id == id).first()

    if user_id:
        return user_id.to_dict(), 200
    else:
        return {'Error': f'User does not exist'}, 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)