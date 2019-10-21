# Documentation for Sauti API

Base URL: https://african-marketplace-bw.herokuapp.com

<details>
<summary> POST - Register a new user</summary>
<br>
Endpoint: BaseURL/api/auth/register

Requires an object with an email and password, both string data types: 
```
{
	"email": "admin@email.com",
	"password": "1234"
}
```
</details>

<details>
<summary> POST - Login a user</summary>
<br>
Endpoint: BaseURL/api/auth/login

Requires an object with an email and password, both string data types: 
```
{
	"email": "admin@email.com",
	"password": "1234"
}
```
</details>




