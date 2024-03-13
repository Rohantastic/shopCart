# E-commerce Backend API

This is a backend API for an e-commerce platform, built with Node.js, Express.js, GraphQL, and Sequelize ORM.

## Setup

1. Clone the repository:

```
git clone https://github.com/rohantastic/shopCart.git
```

#### make sure to create a database named `ecom` or change the database name, and configure configuration/database.js file for mySQL.

2. Install dependencies:
```
npm install
```

3. Set up your environment variables by creating a .env file in the root directory and adding the following variables:
```
JWT_SECRET_KEY=secret_key

```

4. Ensure you have a MySQL server running, and update the database configuration in database.js if necessary.
## Ensure redis server is running !

## Ensure rabbitMQ server is running !

**To install RabbitMQ on localhost:**

- Visit the [RabbitMQ Download page](https://www.rabbitmq.com/download.html) and follow the instructions for your operating system.

- Once installed, RabbitMQ should be accessible at `http://localhost:15672`. The default username is `guest`, and the default password is also `guest`. You can access the RabbitMQ management UI using these credentials.
 
5. Start the server


```
npm start
```
## The server should now be running on http://localhost:3000/graphql.


# Endpoints:->
## Using GraphQL for User Authentication and Ordering Products
### Signing Up and Logging In
 - Sign Up: Users must sign up to create an account.
 - Log In: After signing up, users log in using their credentials.
 - JWT Token: Upon successful login, users receive a JWT token.

 ### Accessing Product Information
 - Add a product: User can add products by going to mutation{ AddProduct{ } }
 - Accessing Products: Navigate to query getProducts to retrieve product information.
 - Product ID: Take note of the productID of the desired product.

 ### Adding Products to Cart
 - Setting JWT Token: Include the JWT token in the header
 - Endpoint: Navigate to mutation addToCart.
 - Passing Product ID: Send the productID as part of the request body.
 - Cart ID: Upon successful addition, you will receive a cartID

 ### Ordering a Product
 - Ordering Endpoint: Proceed to mutation orderAProduct{}.
 - Passing Cart ID: Include the cartID of the desired product in the request.

 ### Fetching Ordered Products
 - User can fetch their ordered products by quering query{getOrderedItems}
 - make sure to provide jwt token

 ### RabbitMQ
 - Backend Process: Upon request, the backend will send a message queue through RabbitMQ and create an orderedItem data in the orderedItem table.

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
1. getOrderedItems: User can fetch their ordered products by quering query{getOrderedItems}
2. Ordered item gets stored into DB through RabbitMQ

### Project Structure:
```
app.js: Entry point for the application.
controllers: Contains controller functions for handling business logic.
graphql: Contains GraphQL schema, resolvers, and typedefs for defining API operations.
models: Defines Sequelize models for database tables.
configuration/database.js: Configures the database connection.
rabbitMQ: Contains message queue configuration
tests: contains jest tests
redis: contains redis flushAll to flush redis store
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
jest: Unit testing
```





