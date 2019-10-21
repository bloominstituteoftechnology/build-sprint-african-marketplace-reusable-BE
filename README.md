# Documentation for Sauti API

Base URL: https://african-marketplace-bw.herokuapp.com

<details>
<summary id="title"><b>POST - Register a new user</b></summary>
<br>
<b>Endpoint:</b>  BaseURL/api/auth/register

Requires an object with an email and password, both string data types: 
```
{
	"email": "admin@email.com",
	"password": "password"
}
```

When successful will return status code of 201 (CREATED) and the new user object and a token (example):

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

When successful will return status code of 200 (OK) and the new user object and a token (example):

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


<style>
#title {
    border: 1px solid;
}
</style>

