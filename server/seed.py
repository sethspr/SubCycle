from random import choice, random
from app import app
from models import db, User, Subscription, EscrowAccount, Transaction, Service
from datetime import datetime
# from config import app, db

with app.app_context():

    #delete all data points from the tables when re-seeding
    print('deleting all data...')
    User.query.delete()
    Subscription.query.delete()
    EscrowAccount.query.delete()
    Transaction.query.delete()
    Service.query.delete()

    #user instances
    print('adding users...')

    users = [
        User(
            username='yeth2seth',
            email='yeth2seth@gmail.com',
            password='abc123',
            escrow_id=1
        ),
        User(
            username='mikeymouse',
            email='mikeymouse@gmail.com',
            password='abc123',
            escrow_id=2
        ),
        User(
            username='slambam',
            email='slambam@gmail.com',
            password='abc123',
            escrow_id=3
        ),

        # User(
        #     username='slambam',
        #     email='slambam@gmail.com',
        #     password_hash='abc123'
        # ),
    ]

    db.session.add_all(users)
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

    #service instances
    print('adding services...')
    
    services = [
        Service(
            company_name = 'Netflix',
            description = 'Netflix is an American subscription video on-demand over-the-top streaming service. The service primarily distributes original and acquired films and television shows from various genres, and it is available internationally in multiple languages.',
            amount='15.49',
        ),
        Service(
            company_name = 'Spotify',
            description='Spotify is a digital music streaming service. It gives you instant access to its vast online library of music and podcasts, allowing you to listen to any content of your choice at any time. You will find millions of songs from a variety of genres and artists, from obscure indie rock and top 40 pop to movie soundtracks and classical music. It also has a complex algorithm to recommend music based on your listening history, as well as curated playlists and internet radio stations.',
            amount='10.99',
        ),
        Service(
            company_name = 'Hulu',
            description='Hulu is a popular streaming service offering a wide range of TV shows, movies, and original content. It features a mix of current and classic programming, including exclusive series and next-day access to many network shows. With customizable subscription options and a user-friendly interface, Hulu provides viewers with a flexible and diverse entertainment experience.',
            amount='7.99',
        ),
        Service(
            company_name = 'Disney+',
            description='Disney+ is a premium streaming platform showcasing the iconic content of The Walt Disney Company, including beloved classics, blockbuster films, and exclusive original series. With its extensive library spanning Disney, Pixar, Marvel, Star Wars, and National Geographic, Disney+ caters to audiences of all ages and interests. Offering a seamless viewing experience across devices and the option for offline downloads, Disney+ has quickly become a go-to destination for family-friendly entertainment.',
            amount='9.99',
        ),
        Service(
            company_name = 'ESPN+',
            description='ESPN+ is a subscription-based sports streaming service that offers a wide range of live and on-demand sports content. From exclusive UFC fights to live games from MLB, NHL, and MLS, ESPN+ provides fans with access to a diverse selection of sports programming. With original shows, documentaries, and analysis, ESPN+ enhances the sports viewing experience for enthusiasts across various devices.',
            amount='10.99',
        ),
        Service(
            company_name = 'MAX',
            description='MAX is a comprehensive streaming service offered by WarnerMedia, featuring an extensive library of movies and TV shows. With a focus on blockbuster films, HBO series, and exclusive originals, MAX provides subscribers with a premium entertainment experience. Offering a mix of classic favorites and new releases, MAX caters to a wide range of tastes and interests.',
            amount='15.99',
        ),
        Service(
            company_name = 'YouTube TV',
            description='YouTube TV is a subscription-based live TV streaming service offering access to major broadcast and cable networks. With a user-friendly interface and unlimited cloud DVR storage, YouTube TV allows subscribers to watch live TV and on-demand content anytime, anywhere. Offering a wide range of channels and the flexibility to stream on multiple devices simultaneously, YouTube TV provides a convenient alternative to traditional cable TV services.',
            amount='72.99',
        ),


        # Service(
        #     company_name = '',
        #     description='',
        #     amount='',
        # ),

    ]

    db.session.add_all(services)
    db.session.commit()

    #subscription instances
    print('adding subscriptions...')

    subscriptions = [
        Subscription(
            due_date='17',
            user_id=users[0].id,
            service_id=services[0].id
        ),
        Subscription(
            due_date='4',
            user_id=users[0].id,
            service_id=services[1].id

        ),
        Subscription(
            due_date='8',
            user_id=users[0].id,
            service_id=services[2].id

        ),
        Subscription(

            due_date='23',
            user_id=users[0].id,
            service_id=services[3].id

        ),
        Subscription(
            due_date='28',
            user_id=users[1].id,
            service_id=services[4].id

        ),
        Subscription(
            due_date='12',
            user_id=users[1].id,
            service_id=services[5].id

        ),
        Subscription(
            due_date='19',
            user_id=users[1].id,
            service_id=services[6].id

        ), 
        Subscription(
            due_date='11',
            user_id=users[2].id,
            service_id=services[0].id

        ), 
        Subscription(
            due_date='24',
            user_id=users[2].id,
            service_id=services[1].id

        ), 
    ]

    # for sub_data in subscriptions:
    #     db.session.add(sub_data)
    db.session.add_all(subscriptions)
    db.session.commit()


    
    # transaction instances
    print('adding transactions...')

    transactions = [
        Transaction(
            subscription_id=subscriptions[0].id,
            transaction_amount=services[0].amount,
            user_id=users[0].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.now()
        ),
        Transaction(
            subscription_id=subscriptions[1].id,
            transaction_amount=services[1].amount,
            user_id=users[0].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[2].id,
            transaction_amount=services[2].amount,
            user_id=users[0].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[3].id,
            transaction_amount=services[3].amount,
            user_id=users[1].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[0].id,
            transaction_amount=services[0].amount,
            user_id=users[1].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[5].id,
            transaction_amount=services[5].amount,
            user_id=users[1].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[6].id,
            transaction_amount=services[6].amount,
            user_id=users[2].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[4].id,
            transaction_amount=services[4].amount,
            user_id=users[2].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        Transaction(
            subscription_id=subscriptions[3].id,
            transaction_amount=services[3].amount,
            user_id=users[2].id,
            transaction_type=choice(['credit', 'debit'])
            # date=datetime.db.func.now()
        ),
        
        
        # Transaction(
        # 
        #     subscription_id=subscriptions[0].id,
        #     transaction_amount=services[0].amount,
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

