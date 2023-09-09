# shop_backend

Rest API for my demo shop application, built with TypeScript, Node.js, Express, MongoDB and Mongoose. 

The API is deployed on my VPS https://eal.social/api/.

You can find the frontend application at https://eduardlupu.github.io/shop/.

## Installation

1. Clone the repository
2. Install dependencies
    ```bash
    npm install
    ```
3. Create a .env file in the root directory as the .env.example
4. Start the server
    ```bash
    npm start
    ```
5. The server will be running on http://localhost:3000


## Endpoints:

- **getProducts**
    - GET /products

- **getProduct**
    - GET /products/{id}

- **addProductToCart**
    - POST /cart/{id}

- **removeProductFromCart**
    - DELETE /cart/{id}

- **deleteProductFromCart**
    - DELETE /cart/delete/{id}

- **initCartProducts**
    - GET /cart

- **login**
    - POST /login

- **register**
    - POST /register

- **logout**
    - POST /logout

- **profile**
    - GET /account

- **reviews**
    - GET /reviews/{productId}

- **createReview**
    - POST /reviews/{productId}

- **getCategories**
    - GET /categories

- **getProductsByCategory**
    - GET /products/category/{category}

- **getProductsBySearch**
    - GET /products/search/{searchValue}

- **createOrder**
    - POST /orders

- **getOrders**
    - GET /orders

- **deleteReview**
    - DELETE /reviews/{ratingId}

- **emptyCart**
    - DELETE /cart

- **createReturn**
    - POST /return

- **deliverOrder**
    - PUT /orders/{orderId}

- **getReturns**
    - GET /return