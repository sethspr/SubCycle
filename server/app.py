from flask import Flask, request, redirect, url_for, flash, render_template
from flask_cors import CORS
from flask_login import LoginManager, login_manager, login_user, login_required, logout_user
from models import db, User, Subscription, EscrowAccount, Transaction, Service
from flask_migrate import Migrate;
import os

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DB_URI", f"sqlite:///app.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

### ------------------------------------------------###------------------------------------------------ ###

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):  # Implement a method to check the password
            login_user(user)
            flash('Logged in successfully.')
            return redirect(url_for('index'))  # Redirect to the index page after login
        else:
            flash('Invalid username or password.')
    return render_template('login.html')


from flask_login import logout_user

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.')
    return redirect(url_for('index'))


### ------------------------------------------------###------------------------------------------------ ###

@app.route('/')
def root():
    return '<h1>SubCycle</h1>'

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
            return {'Error': f'{is_duplicate} is already registered, please choose another username'}
        
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

@app.route('/escrows', methods=['GET'])
def get_all_accounts():
    all_accounts = EscrowAccount.query.all()

    account_dict = []
    for account in all_accounts:
        account_dict.append(account.to_dict())
    return account_dict, 200

@app.route('/escrows/<int:id>', methods=['GET'])
def account_by_id(id):
    account_id = EscrowAccount.query.filter(EscrowAccount.id == id).first()

    if account_id:
        return account_id.to_dict(), 200
    else:
        return {'Error': 'Account not found'}, 404

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


if __name__ == "__main__":
    app.run(port=5555, debug=True)