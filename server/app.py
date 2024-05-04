from flask import Flask, request, session, jsonify
from models import db, User, Subscription, EscrowAccount, Transaction, Service
from config import app, db
from flask_login import LoginManager, login_manager

login_manager = LoginManager()
login_manager.init_app(app)


### ------------------------------------------------###------------------------------------------------ ###

@app.route('/')
def root():
    return '<h1>Hello from SubCycle</h1>'

### ------------------------------------------------###------------------------------------------------ ###

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
            return {'Error': f'{is_duplicate} is already registered, please choose another username'}, 409
        
        new_user = User(
            username=json.get('username'), 
            password=json.get('password'), 
            email=json.get('email')
        )
        
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201

@app.route('/users/<string:username>', methods=['GET'])
def user_profile(username):
    user = User.query.filter_by(username=username).first()

    if user:
        return user.to_dict(), 200
    else:
        return {'Error': 'Username does not exist'}, 404

@app.route('/users/<int:id>', methods=['GET'])
def user_by_id(id):
    user_id = User.query.filter(User.id == id).first()

    if user_id:
        return user_id.to_dict(), 200
    else:
        return {'Error': f'User does not exist'}, 404
    
### ------------------------------------------------###------------------------------------------------ ###

@app.route('/subscriptions', methods=['GET'])
def get_all_subscriptions():
    all_subs = Subscription.query.all()

    subs_dict = []
    for subscription in all_subs:
        subs_dict.append(subscription.to_dict())
    return subs_dict, 200

@app.route('/subscriptions/<int:id>', methods=['GET'])
def sub_by_id(id):
    sub_id = Subscription.query.filter(Subscription.id == id).first()

    if sub_id:
        return sub_id.to_dict(), 200
    else:
        return {'Error': 'Subscription not in database'}, 404

### ------------------------------------------------###------------------------------------------------ ###

@app.route('/escrows', methods=['GET', 'POST'])
def get_all_accounts():
    if request.method == 'GET':
        all_accounts = EscrowAccount.query.all()

        account_dict = []
        for account in all_accounts:
            account_dict.append(account.to_dict())
        return account_dict, 200
    
    elif request.method == 'POST':
            data = request.get_json()
            user_id = data.get('user_id')
            balance = data.get('balance')

            if not user_id or balance is None:
                return jsonify({'Error': 'Missing user ID or balance'}), 400

            account = EscrowAccount.query.filter_by(user_id=user_id).first()

            if account:
                account.balance += balance 
                db.session.commit()
                return jsonify(account.to_dict()), 200
            else:
                # Create a new account if not exists
                try:
                    new_account = EscrowAccount(user_id=user_id, balance=balance)
                    db.session.add(new_account)
                    db.session.commit()
                    return jsonify(new_account.to_dict()), 201
                except Exception as e:
                    db.session.rollback()
                    return jsonify({'Error': str(e)}), 500
    
@app.route('/escrows/<int:id>', methods=['GET', 'PATCH'])
def account_by_id(id):
    if request.method == 'GET':
        account_id = EscrowAccount.query.filter_by(id=id).first()

        if account_id:
            return account_id.to_dict(), 200
        else:
            return {'Error': 'Account not found'}, 404
        
    elif request.method == 'PATCH':
        data = request.get_json()
        new_balance = data.get('balance')

        if new_balance is None:
            return jsonify({'Error': 'Missing balance parameter'}), 400

        account = EscrowAccount.query.filter_by(id=id).first()

        if account:
            account.balance += float(new_balance)
            db.session.commit()
            return jsonify(account.to_dict()), 200
        else:
            return jsonify({'Error': 'Account not found'}), 404

### ------------------------------------------------###------------------------------------------------ ###

@app.route('/transactions', methods=['GET'])
def get_all_transactions():
    all_transactions = Transaction.query.all()

    transaction_dict = []
    for transaction in all_transactions:
        transaction_dict.append(transaction.to_dict())
    return transaction_dict, 200

@app.route('/transactions/<int:id>', methods=['GET'])
def transaction_by_id(id):
    transaction_id = Transaction.query.filter(Transaction.id == id).first()

    if transaction_id:
        return transaction_id.to_dict(), 200
    else:
        return {'Error': 'Transaction not found'}, 404

### ------------------------------------------------###------------------------------------------------ ###

@app.route('/services', methods=['GET'])
def get_all_services():
    all_services = Service.query.all()

    services_dict = []
    for company in all_services:
        services_dict.append(company.to_dict())
    return services_dict, 200

@app.route('/services/<int:id>', methods=['GET'])
def service_by_id(id):
    service_id = Service.query.filter(Service.id == id).first()

    if service_id:
        return service_id.to_dict(), 200
    else:
        return {'Error': 'Subscription service not in database'}

### ------------------------------------------------###------------------------------------------------ ###

@app.route('/login', methods=['POST'])
def login():
    json = request.get_json()
    user = User.query.filter(User.username == json.get('username')).first()
    if not user or not user.authenticate(json.get('password')):
        return {'error': 'Invalid username or password'}, 401
    session['user_id'] = user.id
    return user.to_dict(rules=('-subscriptions', '-password_hash', '-escrow_accounts')), 200

@app.route('/logout', methods=['DELETE'])
def logout():
    if not session.get('user_id'):
        return {'error': 'Not logged in'}, 401
    session['user_id'] = None
    session['username'] = None
    return {'message':'Goodbye'}, 200

@app.route('/check_session', methods=['GET'])
def check_session():
    user = User.query.filter_by(id = session.get('user_id')).first()
    if user:
        return user.to_dict(), 200
    else:
        return {'message': '401: Not Authorized'}, 401

### ------------------------------------------------###------------------------------------------------ ###


if __name__ == "__main__":
    app.run(port=5555, debug=True)