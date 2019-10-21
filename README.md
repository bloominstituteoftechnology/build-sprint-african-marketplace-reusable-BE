# Documentation for Sauti API

Base URL: https://african-marketplace-bw.herokuapp.com

<details>
<summary><b>POST - Register a new user</b></summary>
<br>
<b>Endpoint:</b>  BaseURL/api/auth/register

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
<b>Endpoint:</b> BaseURL/api/auth/login

Requires an object with an email and password, both string data types: 
```
{
	"email": "admin@email.com",
	"password": "password"
}
```

When successful will return status code of 200 (OK), the new user object and a token (example):

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
<summary><b>GET - Get a list of all items by all users</b></summary>
<br>
<b>Endpoint:</b> BaseURL/api/items

Public access endpoint. No token required.

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
