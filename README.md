# Documentation for Sauti API

BaseURL: https://african-marketplace-bw.herokuapp.com

<details>
<summary><b>POST - Register a new user</b></summary>
<br>
<b>Endpoint:</b>  <code>BaseURL/api/auth/register</code>
<br>
<br>
Requires an object with an email and password, both string data types: 

```
{
	"email": "admin@email.com",
	"password": "password"
}
```

When successful will return status code of 201 (CREATED), the new user object and a token (example):

```
{
    "new_user": {
        "id": 2,
        "email": "admin@email.com",
        "name": null,
        "about": null,
        "avatar_url": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6kpXVCJ9..."
}
```
</details>

<details>
<summary><b>POST - Login a user</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/auth/login</code>
<br>
<br>
Requires an object with an email and password, both string data types: 

```
{
	"email": "admin@email.com",
	"password": "password"
}
```

When successful will return status code of 200 (OK), the new item object and a token (example):

```
{
    "user": {
        "id": 2,
        "email": "admin@email.com",
        "name": null,
        "about": null,
        "avatar_url": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6kpXVCJ9..."
}
```
</details>

<details>
<summary><b>GET - Get a user by user id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/users/:id</code>
<br>
<br>
Restricted endpoint. Token required.
<br>
<br>
When successful will return status code of 200 (OK) and a single user object with an array of the items they've posted as well their list of favorite items. Here is an example:

```
{
    "user": {
        "id": 1,
        "email": "admin@email.com",
        "name": null,
        "about": null,
        "avatar_url": null,
        "items": [
            {
                "id": 1,
                "name": "rice",
                "description": null,
                "photo_url": null,
                "zip_code": "65109C",
                "price": 2,
                "created_at": "2019-10-21T04:58:11.423Z",
                "user_id": 1,
                "categories": [
                    {
                        "id": 2,
                        "type": "food",
                        "item_id": 1
                    }
                ]
            }
        ],
        "favorites": [
            {
                "item_id": 1,
                "user_id": 1,
                "id": 1,
                "name": "rice",
                "description": null,
                "photo_url": null,
                "zip_code": "65109C",
                "price": 2,
                "created_at": "2019-10-21T04:58:11.423Z"
            }
        ]
    }
}
```
</details>

<details>
<summary><b>GET - Get a list of all items</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items</code>
<br>
<br>
Public access endpoint. No token required.
<br>
<br>
When successful will return status code of 200 (OK) and an array of item objects. Here is an example:

```
[
    {
        "id": 1,
        "name": "rice",
        "description": null,
        "photo_url": null,
        "zip_code": "65109C",
        "price": 2.25,
        "created_at": "2019-10-21T04:58:11.423Z",
        "user_id": 1
    },  
    {
        "id": 2,
        "name": "beans",
        "description": null,
        "photo_url": null,
        "zip_code": "65109C",
        "price": 2.75,
        "created_at": "2019-10-21T04:58:11.423Z",
        "user_id": 2
    }
]
```
</details>

<details>
<summary><b>GET - Get any item by the item's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items/:id</code>
<br>
<br>
Public access endpoint. No token required.
<br>
<br>
When successful will return status code of 200 (OK) and a single item object. Here is an example:

```
{
    "item": {
        "id": 1,
        "name": "rice",
        "description": null,
        "photo_url": null,
        "zip_code": "65109C",
        "price": 2,
        "created_at": "2019-10-21T04:58:11.423Z",
        "user_id": 1,
        "categories": [
            {
                "id": 2,
                "type": "food",
                "item_id": 1
            }
        ]
    }
}
```
</details>

<details>
<summary><b>POST - Post a new item</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items</code>
<br>
<br>
Restricted endpoint. Token required.
<br>
<br>
Requires an object with the following required fields: "name", "zip_code", "price", and "user_id". All other fields are optional: 

```
{
	"name": "Unprocessed Honey",
	"description": "Fresh local honey that has no artificial ingredients.",
	"photo_url": "https://www.indianapolisorchard.com/wp-content/uploads/2014/02/apple-varieties-587.jpg",
	"zip_code": "0083",
	"price": 5.75,
	"user_id": 2
}
```

When successful will return status code of 201 (CREATED) and a single object of the newly created item. Here is an example:

```
{
    "id": 2,
    "name": "Unprocessed Honey",
    "description": "Fresh local honey that has no artificial ingredients.",
    "photo_url": "https://www.indianapolisorchard.com/wp-content/uploads/2014/02/apple-varieties-587.jpg",
    "zip_code": "0083",
    "price": 5.75,
    "created_at": "2019-10-21T17:44:05.057Z",
    "user_id": 2
}
```
</details>

<details>
<summary><b>PUT - Edit an item by item's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items/:id</code>
<br>
<br>
Restricted endpoint. Token required.
<br>
<br>
Requires an object with the field(s) being updated:

```
{
	"price": 10.75
}
```

When successful will return status code of 201 (CREATED) and a single object of the newly created item. Here is an example:

```
{
    "id": 2,
    "name": "Unprocessed Honey",
    "description": "Fresh local honey that has no artificial ingredients.",
    "photo_url": "https://www.indianapolisorchard.com/wp-content/uploads/2014/02/apple-varieties-587.jpg",
    "zip_code": "0083",
    "price": 10.75,
    "created_at": "2019-10-21T17:44:05.057Z",
    "user_id": 2
}
```
</details>

<details>
<summary><b>DELETE - Delete an item by item's id</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items/:id</code>
<br>
<br>
Restricted endpoint. Token required.
<br>
<br>
No body required in the request. 

When successful will return an HTTP status code of 200 (OK) and a success message. Here is an example:

```
{
    "message": "Item successfully deleted from database."
}
```
</details>

<details>
<summary><b>GET - Get a list of items by zip code</b></summary>
<br>
<b>Endpoint:</b> <code>BaseURL/api/items/zip/:zip</code>
<br>
<br>
Public access endpoint. No token required.
<br>
<br>
No body required in the request. 
Zip code can be a combination of numbers and letters but it must match exactly. 

When successful will return an HTTP status code of 200 (OK) and an array of search results that match the zip code search. Here is an example: 

```
[
    {
        "id": 3,
        "name": "Exotic Chicken",
        "description": "Exotic locally raised chicken that have never been treated with hormones or antibiotics. Grass fed and cage free.",
        "photo_url": "https://www.indianapolisorchard.com/wp-content/uploads/2014/02/apple-varieties-587.jpg",
        "zip_code": "65109H",
        "price": 10.75,
        "created_at": "2019-10-21T19:33:27.498Z",
        "user_id": 2
    },
    {
        "id": 5,
        "name": "Unprocessed Honey",
        "description": "Fresh local honey that has no artificial ingredients.",
        "photo_url": "https://www.indianapolisorchard.com/wp-content/uploads/2014/02/apple-varieties-587.jpg",
        "zip_code": "65109H",
        "price": 10.75,
        "created_at": "2019-10-21T20:02:38.641Z",
        "user_id": 3
    }
]
```
</details>