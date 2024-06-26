
TODO:

- Subscriptions page, should appear in the bar when the user is not signed in
- Remove `<h1>Supported Subscriptions</h1>` from subscriptionList and put it on subscription page
- Add functionality to the "View transactions" icon on each card
- Always show the card list on user profile
- Remove the existing user subs (below card list)
- Next to welcome back, add the escrow account total at the top of the page
- Fix the errors on the subscriptionList component (the user is not populated at all times when the effect is run)
- Remove extra console.log/console.dirs
- Add route to remove a subscription from user's subs
- Add route to update a subscriptions due date














User [1 -> 1] Escrow [1 -> *] Subscriptions [1 -> 1] Service
|
|--> [1 -> *] Transactions/Audit

/login
-> get user_id; GET /subscriptions
-> on the backend, this get a bunch sub objects, but theres no service info in them, before returning must populate service info for each subscription

```ts
// chunky
// api-call
@endpoint('GET /user-profile')
public async function get_user_profile(user_id: number) {
    if (requestor.user_id !== user_id) throw 403;

    const subs = await db.get_subscriptions(user_id);
    const service_ids = subs.map(s => s.service_id);

    const service_id_map = Promise.all(service_ids.map(async id => {
        const service = await db.get_service(id);
        return {id, service};
    }));

    subs.map(s => {
        const service_info = service_id_map.find(serv => serv.id === s.service_id);
        return {...s, service: service_info};
    });

    return subs;
}
```

```ts
// chatty
@endpoint()
login() {
    //logs the user in
    ...
    return { user };
}

// api code
@endpoint()
get_subs(user_id) {
    if (user_id !== requestor.id) throw 403

    const subscriptions = db.query_table<subscriptions>(user_id);

    return subsciptions;
}


@endpoint()
get_service_info(service_id) {
    const info = db.query_table<services>(service_id);

    return info;
}

// front-end code

const user_info = await login();

const subs = await get_subs(user_info.id);

const hydrated_subs = Promise.all(subs.map(async subscription => {
    const service_info = await get_service_info(subscription.service_id);
    return {...subscription, ...service_info};
}));

```

```ts
// in the front end; on APP load
call_api('GET', '/services'); // store all the service info in memory

// on login
call_api('/login')
    |--> call_api('/escrow/{user-id}') // get the user's escrow balance && put it memory
    |--> call_api('/subscriptions/{user-id}') // get the user's subscriptions && put them in memory

// when you need to render a login on the UI
get_service_info_from_cache(service_id) // get the service info from front end memory (cache)

```

# User object

User {
id: number, [PK]
escrow_id: number,
user_name: string,
email: string,
password: string,
}

## Accessibilty

- Login
- Logout

## Endpoints

- `POST /login`
- `DELETE /logout`

---

# Escrow account

Escrow {
balance: float,
subscriptions: number[], // list of subscription ids
user_id: number [FK]
}

## Accessibility

- Create an escrow account
- Add funds to an escrow
- Remove funds from an escrow
- Add subscriptions
- Remove subscriptions
- Delete an account

## Endpoints

- `POST /escrow/{user-id}`
- `PATCH /escrow/{user-id}/add-funds/{amount}`
- `PATCH /escrow/{user-id}/remove-funds/{amount}`
- `PATCH /escrow/{user-id}/add-subscription/{subscription-id}`
- `PATCH /escrow/{user-id}/remove-subscription/{subscription-id}`
- `DELETE /escrow/{user-id}`

---

# Subscription object

Subscription {
id: number [PK], (current setup)
user_id: number [FK], (current setup)
service_id: number [FK], (current setup)
due_date: date (current setup)
}

## Accessibility

- Create a new subscription
- Delete a subscription
- Query all subscriptions for a user
- Query single subscription for a user
- Update a due_date for a user's subscription

## Endpoints

- `POST /subscription/{user-id}` // creates a new sub for this user
  - body: service_id, due_date
- `DELETE /subscription/{subscription-id}` // delete a single sub
- `GET /subscriptions/{user-id}` // gets all of this user's subs
- `GET /subscriptions/{subscription-id}` // get a specific sub
- `PATCH /subscription/{subscription-id}/change-due-date` //updates a user's sub due date

---

# Transaction object

Transaction/Audit {
timestamp: datetime,
user_id: number [FK],
subscription_id [FK]: number,
transaction_type: 'credit' || 'debit',
transaction_amount: float
}

## Accessibility

- get all audits for a single user
- add an audit event for a user (backend-only, as a result of specific escrow events)

## Endpoint

- `GET /audit/{user-id}`

---

# Service object

Service {
name: string,
id: number [PK],
cost_per_month: float
}

## Accessiblity

- Query all available services
- Query info about a specific (by id)

## Endpoints

- `GET /services` // gets all services
- `GET /services/{service-id}` // get specific service


##### Last minute touchups
- login.jxs
    |--- after sign in the `login successful message persists`
- SubscriptionList.jsx
    |--- clean up card spacing
    |--- once logged in, when adding a subscription only Netflix persists `fetch issue`
    |--- once logged in, when after adding a subscription, manual refresh of page is requried `need fix`
    |--- once logged in, ability to add a due date after subscription has been added to profile. 
- UserProfile.jsx 
    |--- format `Link subscriptions to profile ` button
    |--- escrow account format balance to have decimal/float (works if there is actually cents in the $$)
    |--- After new user sign up, no subscriptions persists once added 
- Navbar.jsx
    |--- Icon button for login no longer shows the little human head


###### Stretch (if time allows)
- SubscriptionList.jsx
    |--- Delete subscription, cascading. 


