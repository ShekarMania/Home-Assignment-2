# Home-Assignment--2

Users API

# To Create a  User

http://localhost:3000/users
Method POST
Required Payload:
1. Name,
2. Email
3. Password
4. Address
5. ToS Agreement

example payload :
{
  "name":"user1",
  "email":"user1@gmail.com",
  "password":"14dc11fd0f906f2782cc633cf86c1524dd9ef7ea",
  "address":"Bangalore",
  "tosAgreement":true
}

# To Edit a User
http://localhost:3000/users
Method PUT
Required Payload:
1. Email
Optional Payload:
1. Name
2. password
3. address

# To Delete a user
http://localhost:3000/users
Method: DELETE
Requried Payload:
1. Email

# To Login
http://localhost:3000/login
Method: POST
Required Payload:
1. Email
2. Password

example payload:
{
  "email":"user1@gmail.com",
  "password":"14dc11fd0f906f2782cc633cf86c1524dd9ef7ea"
}

# To Logout
http://localhost:3000/logout
Method DELETE
Required Query Params - id(JWT)


# To get Menu
http://localhost:3000/menu
Method GET
Required Header - id (JWT)
Required query param - email

# To add Items to Shopping Cart
http://localhost:3000
Method: POST
Required Header id(JWT)
Required Payload:
1. ItemId

example Payload:
{
  "itemId":1
}

# To Place Order
http://localhost:3000/order
Method: POST
Required Header - id(JWT)
Required Payload:
1. cardId

example payload:
{
  "cartId":1021
}
