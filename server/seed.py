import random
from app import app
from models import db, User, Subscription, EscrowAccount, Transaction
from datetime import datetime
# from config import app, db

with app.app_context():

    #delete all data points from the tables when re-seeding
    print('deleting all data...')
    User.query.delete()
    Subscription.query.delete()
    EscrowAccount.query.delete()
    Transaction.query.delete()

    #user instances
    print('adding users...')
    users = [
        User(
            username='yeth2seth',
            email='yeth2seth@gmail.com',
            password='abc123'
        ),
        User(
            username='mikeymouse',
            email='mikeymouse@gmail.com',
            password='abc123'
        ),
        User(
            username='slambam',
            email='slambam@gmail.com',
            password='abc123'
        ),

        # User(
        #     username='slambam',
        #     email='slambam@gmail.com',
        #     password='abc123'
        # ),
    ]

    db.session.add_all(users)
    db.session.commit()

    #subscription instances
    print('adding subscriptions...')
    subscriptions = [
        Subscription(
            sub_name='Netflix',
            description='Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.',
            amount='15.49',
            due_date='17th of the Month',
            user_id="1"
        ),
        Subscription(
            sub_name='Spotify',
            description='Spotify is a digital music streaming service. It gives you instant access to its vast online library of music and podcasts, allowing you to listen to any content of your choice at any time. You will find millions of songs from a variety of genres and artists, from obscure indie rock and top 40 pop to movie soundtracks and classical music. It also has a complex algorithm to recommend music based on your listening history, as well as curated playlists and internet radio stations.',
            amount='10.99',
            due_date='4th of the Month',
            user_id="2"
        ),
        Subscription(
            sub_name='Hulu',
            description='Hulu is a popular streaming service offering a wide range of TV shows, movies, and original content. It features a mix of current and classic programming, including exclusive series and next-day access to many network shows. With customizable subscription options and a user-friendly interface, Hulu provides viewers with a flexible and diverse entertainment experience.',
            amount='7.99',
            due_date='8th of the Month',
            user_id="3"
        ),
        Subscription(
            sub_name='Disney+',
            description='Disney+ is a premium streaming platform showcasing the iconic content of The Walt Disney Company, including beloved classics, blockbuster films, and exclusive original series. With its extensive library spanning Disney, Pixar, Marvel, Star Wars, and National Geographic, Disney+ caters to audiences of all ages and interests. Offering a seamless viewing experience across devices and the option for offline downloads, Disney+ has quickly become a go-to destination for family-friendly entertainment.',
            amount='9.99',
            due_date='23rd of the Month',
            user_id="1"
        ),
        Subscription(
            sub_name='ESPN+',
            description='ESPN+ is a subscription-based sports streaming service that offers a wide range of live and on-demand sports content. From exclusive UFC fights to live games from MLB, NHL, and MLS, ESPN+ provides fans with access to a diverse selection of sports programming. With original shows, documentaries, and analysis, ESPN+ enhances the sports viewing experience for enthusiasts across various devices.',
            amount='10.99',
            due_date='28th of the Month',
            user_id="2"
        ),
        Subscription(
            sub_name='MAX',
            description='MAX is a comprehensive streaming service offered by WarnerMedia, featuring an extensive library of movies and TV shows. With a focus on blockbuster films, HBO series, and exclusive originals, MAX provides subscribers with a premium entertainment experience. Offering a mix of classic favorites and new releases, MAX caters to a wide range of tastes and interests.',
            amount='15.99',
            due_date='12th of the Month',
            user_id="3"
        ),
        Subscription(
            sub_name='YouTube TV',
            description='YouTube TV is a subscription-based live TV streaming service offering access to major broadcast and cable networks. With a user-friendly interface and unlimited cloud DVR storage, YouTube TV allows subscribers to watch live TV and on-demand content anytime, anywhere. Offering a wide range of channels and the flexibility to stream on multiple devices simultaneously, YouTube TV provides a convenient alternative to traditional cable TV services.',
            amount='72.99',
            due_date='19th of the Month',
            user_id="1"
        ), 

        # Subscription(
        #     sub_name='',
        #     description='',
        #     amount='',
        #     due_date='',
        #     user_id=users.id
        # ), 
    ]

    # for sub_data in subscriptions:
    #     db.session.add(sub_data)
    db.session.add_all(subscriptions)
    db.session.commit()

    #escrow instances
    print('adding escrow account...')
    escrow_accounts = [
        EscrowAccount(
            balance='155.00',
            user_id=users[0].id
        ),
        EscrowAccount(
            balance='125.00',
            user_id=users[1].id
        ),
        EscrowAccount(
            balance='100.00',
            user_id=users[2].id
        ),

        # EscrowAccount(
        #     balance='',
        #     user_id=users[4].id
        # )
    ]

    # for account_data in escrow_accounts:
    #     escrow_account = EscrowAccount(account_data)
    #     db.session.add(escrow_account)
    db.session.add_all(escrow_accounts)
    db.session.commit()

    print('adding transactions...')
    transactions = [
        Transaction(
            escrow_id=escrow_accounts[0].id,
            subscription_id=subscriptions[0].id,
            amount=subscriptions[0].amount,
            # date=datetime.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[0].id,
            subscription_id=subscriptions[1].id,
            amount=subscriptions[1].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[0].id,
            subscription_id=subscriptions[2].id,
            amount=subscriptions[2].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[1].id,
            subscription_id=subscriptions[3].id,
            amount=subscriptions[3].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[1].id,
            subscription_id=subscriptions[0].id,
            amount=subscriptions[0].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[1].id,
            subscription_id=subscriptions[5].id,
            amount=subscriptions[5].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[2].id,
            subscription_id=subscriptions[6].id,
            amount=subscriptions[6].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[2].id,
            subscription_id=subscriptions[4].id,
            amount=subscriptions[4].amount,
            # date=datetime.db.func.now()
        ),
        Transaction(
            escrow_id=escrow_accounts[2].id,
            subscription_id=subscriptions[3].id,
            amount=subscriptions[3].amount,
            # date=datetime.db.func.now()
        ),
        
        
        # Transaction(
        #     escrow_id=escrow_accounts[0].id,
        #     subscription_id=subscriptions[0].id,
        #     amount=subscriptions[0].amount,
        #     date=datetime.db.func.now()
        # ),

        # Transaction(
        #     escrow_id='',
        #     subscription_id='',
        #     amount='',
        #     date=''
        # ),
    ]

    db.session.add_all(transactions)
    db.session.commit()

    print('See data generation completed.')

