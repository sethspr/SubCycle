# SubCycle

SubCycle is an escrow application designed to streamline the management of your online streaming subscriptions. With SubCycle, users can fund an escrow account once a month and have the app disperse payments on their true due dates during each billing cycle.

## Features

- **Subscription Management**: Easily manage your online streaming subscriptions within SubCycle.
- **Budgeting**: Fund your escrow account once a month, allowing for easier budgeting of subscription payments.
- **Automatic Payment Dispersal**: SubCycle automatically disperses payments to your subscriptions on their true due dates, ensuring timely payments and avoiding late fees.

## Getting Started

To get started with SubCycle, follow these steps:

1. **Installation**: Clone the repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/subcycle.git

2. Setup: Install dependencies and set up your environment.

    ```cd subcycle
    pip install -r requirements.txt

3. Database Initialization: Initialize the database and apply migrations.

    ```flask db init
    flask db migrate
    flask db upgrade

4. Run the Application: Start the Flask development server.

    ```flask run

5. Access SubCycle: Open your web browser and navigate to http://localhost:5000 to access SubCycle.

Usage
User Registration: Sign up for a SubCycle account to get started.
Subscription Management: Add, edit, or delete your streaming subscriptions.
Escrow Funding: Fund your escrow account once a month to cover your subscription payments.
Payment Dispersal: SubCycle automatically disperses payments to your subscriptions on their due dates.
Technologies Used
Python: Backend development using the Flask framework.
SQLAlchemy: Database ORM for interacting with the database.
React: Frontend development for the user interface.
HTML/CSS: Styling and layout of the web application.
Contributing
Contributions to SubCycle are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

