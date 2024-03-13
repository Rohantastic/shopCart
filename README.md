# E-commerce Backend API

This is a backend API for an e-commerce platform, built with Node.js, Express.js, GraphQL, and Sequelize ORM.

## Setup

1. Clone the repository:

```
git clone https://github.com/rohantastic/shopCart.git
```

2. Install dependencies:
```
npm install
```

3. Set up your environment variables by creating a .env file in the root directory and adding the following variables:
```
JWT_SECRET_KEY=secret_key

```

4. Ensure you have a MySQL server running, and update the database configuration in database.js if necessary.
5. Ensure redis server is running !
6. Ensure rabbitMQ server is running !
7. Start the server
```
npm start
```
## The server should now be running on http://localhost:3000/graphql.

# Features
## Authentication
1. Signup: Allows users to create an account with a unique email address.
2. Login: Allows users to authenticate with their email and password.
## Products
1. Add Product: Allows admins to add new products with name, description, and price.
2. Get Products: Retrieves a list of all products available.
## Cart Management
1. Add to Cart: Allows authenticated users to add products to their cart.
2. Get Carts: Retrieves the items in the user's cart.

## Orders
1. Order a Product: Allows users to place an order for the items in their cart.

## OrderedItem 
1. Ordered item gets stored into DB through RabbitMQ
2. 
### Project Structure:
```
app.js: Entry point for the application.
controllers/: Contains controller functions for handling business logic.
graphql/: Contains GraphQL schema, resolvers, and typedefs for defining API operations.
models/: Defines Sequelize models for database tables.
configuration/database.js: Configures the database connection.
routes/: Contains route definitions (not used in GraphQL setup).
README.md: Project documentation.
```

## Dependencies:
```
express: Web framework for Node.js.
sequelize: ORM for interacting with MySQL database.
apollo-server-express: GraphQL server integration with Express.
jsonwebtoken: Authentication using JSON Web Tokens (JWT).
bcrypt: Hashing passwords for secure storage.
dotenv: Loading environment variables from .env file.
ioredis: Redis client for caching.
amqplib: RabbitMQ library
```





