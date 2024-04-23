from flask import Flask, request, session
from models import User, Subscription, EscrowAccount, Transaction
from config import app, db


@app.route('/')
def root():
    return '<h1>SubCycle</h1>'

if __name__ == "__main__":
    app.run(port=5555, debug=True)