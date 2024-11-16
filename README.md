# Bazaar-Bloom

This is a scalable, microservice-based backend for an e-commerce platform, powered by **PostgreSQL** as the database. It includes essential services like user authentication, product management, shopping cart, favorites, orders, and checkout. The microservice architecture ensures each feature is modular and can be easily updated or scaled as the business grows. This design allows for smooth integration, flexibility, and easy maintenance in the long run.

# Installation Guide
To set up and run this e-commerce backend locally, follow the steps below:

### Prerequisites
Make sure you have Docker installed on your system.

### Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/anshifmonz/bazaar-bloom.git
cd bazaar-bloom
```

### Execute Commands
Execute the following command on Terminal
```bash
mv .env.example .env
docker-compose up
```

This will launch the server on http://localhost:9999.

## **API Gateway**
`GET /api/<service>`  

This endpoint acts as a proxy gateway, forwarding requests to various microservices in the system. Each service handles a specific functionality such as authentication, cart management, product data, favorites, orders, and checkout.  

---

#### **Request**  

The request is routed to different services based on the path prefix:

- `/api/auth` → Routes to the **User Service**  
- `/api/cart` → Routes to the **Cart Service**  
- `/api/product` → Routes to the **Product Service**  
- `/api/favorite` → Routes to the **Favorite Service**  
- `/api/order` → Routes to the **Order Service**  
- `/api/checkout` → Routes to the **Checkout Service**

---

#### **Example Usage**  

**cURL Command:**  
To call the **Authentication Service**:
```bash
curl -X GET "http://localhost:9999/api/auth/someAuthEndpoint"
```

To call the **Cart Service**:
```bash
curl -X GET "http://localhost:9999/api/cart/someCartEndpoint" \
-H "Cookie: connect.sid=<your-session-id>"
```

---  

<br><br><br>

## **Quick Links to API**

- [Authentication API](#authentication-api)  
- [Product API](#product-api)  
- [Cart API](#cart-api)  
- [Favorite API](#favorite-api)  
- [Order API](#order-api)  
- [Checkout API](#checkout-api)  

## **Authentication API**

### **Register User**
`POST /api/auth/signUp`

Register a new user.

---

#### **Request**

**Headers:**  
- `Content-Type: application/json`

**Body**: `(JSON)`
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

---

#### **Response**

**Success Response:**  
- **Status Code**: `201 Created`
- **Body**:
  ```json
  {
    "success": true,
    "message": "User created"
  }
  ```

**Error Response:**  
- **Status Code**: `500 Bad Request` 
- **Body:**
  ```json
  {
    "message": "Server error"
  }
  ```

---
  
#### **Example Usage**

**cURL Command:**
```bash
curl -X POST https://example.com/api/auth/signUp \
-H "Content-Type: application/json" \
-d '{
  "name": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}'
```
---

<br><br>

### **LogIn User**
`POST /api/auth/logIn`

Login a user.

---

#### **Request**

**Headers:**  
- `Content-Type: application/json`

**Body:** `(JSON)`
```json
{
  "email": "string",
  "password": "string"
}
```

---

#### **Response**

**Success Response:**  
- **Status Code**: `200 OK`
- **Body**:  
  ```json
  {
    "message": "LogIn Successful"
  }
  ```

- **Status Code**: `404 Not Found`
- **Body**:  
  ```json
  {
    "message": "Email or password is incorrect"
  }
  ```

**Error Response:**  
- **Status Code**: `500 Internal Server Error`
- **Body**: 
  ```json
  {
    "message": "Server error"
  }
  ```

---
  
#### **Example Usage**

**cURL Command:**
```bash
curl -X POST https://example.com/api/auth/logIn \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "securepassword"
}'
```
---

<br><br>

### **LogOut User**
`POST /api/auth/logOut`

Logout a user.

---

#### **Request**

**Headers:**  
- `Content-Type: application/json`
- `Cookie: connect.sid=<your-session-id>` 

**Parameters**  

No additional query or body parameters are required.  

#### **Response**

**Success Response:**  
- **Status Code**: `200 OK` 
- **Body**:  
  ```json
  {
    "success": true,
    "message": "logOut successful"
  }
  ```

**Error Response:**  
- **Status Code**: `500 Internal Server Error`
- **Body**: 
  ```json
  {
    "message": "Server error"
  }
  ```

---
  
#### **Example Usage**

**cURL Command:**
```bash
curl -X POST https://example.com/api/auth/logOut \
-H "Content-Type: application/json"
```
---

<br><br>

## **Product API**

### **Show Product**
`GET /api/product/`

This endpoint retrieves a list of products from the database based on user-specified filters like search terms, category, price range, and sorting options.

---

#### **Request**

**Query Parameters**

| Parameter   | Type     | Required | Description |
|-------------|----------|----------|----------------------------------------------------------------------------|
| `search`    | `string` | No       | Search term to match product names or descriptions.                        |
| `category`  | `string` | No       | Filter products by their category.                                         |
| `minPrice`  | `number` | No       | Minimum price of products.                                                 |
| `maxPrice`  | `number` | No       | Maximum price of products.                                                 |
| `sort`      | `string` | No       | Sort order of results. Possible values: `price_asc`, `price_desc`.         |

---

---

#### **Response**

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "category": "Category Name",
        "price": 100.0
      },
      {
        "id": 2,
        "name": "Another Product",
        "description": "Another Description",
        "category": "Another Category",
        "price": 200.0
      }
    ]
  }
  ```

#### **Error Response**
- **Status Code**: `500 Internal Server Error`
- **Body**:
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```

---

#### **Example Usage**

**cURL Command:**
```bash
curl -X GET "http://localhost:3000/api/products?search=laptop&category=electronics&minPrice=500&maxPrice=2000&sort=price_asc"
```

---

<br><br>


### **Add Product** (Only for Admin)
`POST /api/product/`  

This endpoint allows you to add a new product to the database. It validates the input to ensure the `price` and `stock` fields are valid numbers.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>` 

**Body Parameters**  

| Parameter     | Type     | Required | Description                                                                |
|---------------|----------|----------|----------------------------------------------------------------------------|
| `name`        | `string` | Yes      | The name of the product.                                                   |
| `description` | `string` | Yes      | A brief description of the product.                                        |
| `price`       | `number` | Yes      | The price of the product. Must be a positive number or decimal value.      |
| `stock`       | `number` | Yes      | The quantity of the product in stock. Must be a positive integer.          |
| `category`    | `string` | Yes      | The category to which the product belongs.                                 |
| `img_url`     | `string` | No       | A URL pointing to the product's image.                                     |  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Response:**  
- **Status Code**: `400 Bad Request`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Invalid input"
  }
  ```  
- **Status Code**: `500 Internal Server Error`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/products" \
-H "Content-Type: application/json" \
-d '{
  "name": "Laptop",
  "description": "A high-performance laptop for professionals.",
  "price": 1500.99,
  "stock": 10,
  "category": "Electronics",
  "img_url": "http://example.com/images/laptop.jpg"
}'
```  

---  

<br><br>

### **Update Product** (Only for Admin)
`PUT /api/product/`  

This endpoint allows you to update the details of an existing product in the database. It validates the presence of a `productId` and dynamically constructs the update query based on the fields provided in the request body.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>` 

**Body Parameters**  

| Parameter     | Type     | Required | Description                                                                |
|---------------|----------|----------|----------------------------------------------------------------------------|
| `productId`   | `string` | Yes      | The unique identifier of the product to be updated.                        |
| `name`        | `string` | No       | The updated name of the product.                                           |
| `description` | `string` | No       | The updated description of the product.                                    |
| `price`       | `number` | No       | The updated price of the product. Must be a positive number or decimal.    |
| `stock`       | `number` | No       | The updated stock quantity of the product. Must be a positive integer.     |
| `category`    | `string` | No       | The updated category of the product.                                       |
| `img_url`     | `string` | No       | The updated URL pointing to the product's image.                           |  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Response:**  
- **Status Code**: `400 Bad Request`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Product id required"
  }
  ```  
- **Status Code**: `500 Internal Server Error`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X PUT "http://localhost:3000/api/product" \
-H "Content-Type: application/json" \
-d '{
  "productId": "12345",
  "name": "Updated Name",
  "description": "An updated description.",
  "price": 1600.99,
  "stock": 15,
  "category": "Electronics",
  "img_url": "http://example.com/images/updated-product.jpg"
}'
```  

---  

<br><br>

### **Delete Product(s)** (Only for Admin) 
`DELETE /api/product/`  

This endpoint allows you to delete one or more products from the database by specifying their IDs in the request body.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>` 

**Body Parameters**  

| Parameter     | Type     | Required | Description                                                                |
|---------------|----------|----------|----------------------------------------------------------------------------|
| `productId`   | `string` | Yes      | A comma-separated string of product IDs to delete. Each ID must be valid.  |  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Response:**  
- **Status Code**: `400 Bad Request`  
  - **Body**:  
    ```json
    {
      "success": false,
      "message": "Invalid input"
    }
    ```  
- **Status Code**: `500 Internal Server Error`  
  - **Body**:  
    ```json
    {
      "success": false,
      "message": "Server error"
    }
    ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X DELETE "http://localhost:3000/api/products" \
-H "Content-Type: application/json" \
-d '{
  "productId": "12345,67890"
}'
```  

---  

<br><br>

## **Cart API**

### **Get Cart** (Auth required)  
`GET /api/cart/`  

This endpoint retrieves the cart details for the authenticated user, including the items currently in the user's cart. Authentication is managed via session-based login using Passport.js.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Parameters**  

No additional query or body parameters are required.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "productId": "12345",
        "name": "Product Name",
        "quantity": 2,
        "price": 50.0
      },
      {
        "id": 2,
        "productId": "67890",
        "name": "Another Product",
        "quantity": 1,
        "price": 150.0
      }
    ]
  }
  ```  

**Error Response:**  
- **Status Code**: `500 Internal Server Error`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X GET "http://localhost:3000/api/cart" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>  

### **Add Cart Item** (Auth required)  
`POST /api/cart/`  

This endpoint adds a new item to the authenticated user's cart. The item is validated to ensure it exists and is not already present in the cart.  

---  

#### **Request**  

**Headers**  

- `Cookie: connect.sid=<your-session-id>`  

**Body Parameters**  

| Parameter    | Type     | Required | Description                                    |
|--------------|----------|----------|------------------------------------------------|
| `productId`  | `string` | Yes      | The ID of the product to add to the cart.      |

**Validation:**  
- The `productId` must be a numeric string.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Product Does Not Exist:**  
   - **Status Code**: `409 Conflict`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Product doesn't exist"
     }
     ```  

3. **Cart Item Already Exists:**  
   - **Status Code**: `409 Conflict`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Cart item already exist"
     }
     ```  

4. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/cart" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "productId": "12345"
}'
```  

---  

<br><br>

### **Update Cart Item Quantity** (Auth required)  
`PATCH /api/cart/`  

This endpoint updates the quantity of an item in the authenticated user's cart.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Body Parameters**  

| Parameter      | Type     | Required | Description                          |
|----------------|----------|----------|--------------------------------------|
| `cartItemId`   | `string` | Yes      | The ID of the cart item to update.   |
| `quantity`     | `string` | Yes      | The new quantity of the cart item.   |

**Validation:**  
- Both `cartItemId` and `quantity` must be numeric strings.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X PATCH "http://localhost:3000/api/cart" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "cartItemId": "67890",
  "quantity": "3"
}'
```  

---   

<br><br>

### **Delete Cart Item** (Auth required)  
`DELETE /api/cart/`  

This endpoint removes a specific item from the authenticated user's cart.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Body Parameters**  

| Parameter      | Type     | Required | Description                        |
|----------------|----------|----------|------------------------------------|
| `cartItemId`   | `string` | Yes      | The ID of the cart item to remove. |

**Validation:**  
- `cartItemId` must be a numeric string.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X DELETE "http://localhost:3000/api/cart" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "cartItemId": "12345"
}'
```  

---  

<br><br>

## **Favorite API**  

### **Show Favorite Products** (Auth required)  
`GET /api/favorite/`  

This endpoint retrieves a list of products that are marked as favorites by the authenticated user.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`    

**Parameters**  

No additional query or body parameters are required.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "product_id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "category": "Category Name",
        "price": 100.0,
        "img_url": "http://example.com/product-image.jpg"
      },
      {
        "id": 2,
        "product_id": 2,
        "name": "Another Product",
        "description": "Another Description",
        "category": "Another Category",
        "price": 200.0,
        "img_url": "http://example.com/another-product-image.jpg"
      }
    ]
  }
  ```  

**Error Response:**  
- **Status Code**: `500 Internal Server Error`  
- **Body**:  
  ```json
  {
    "success": false,
    "message": "Server error"
  }
  ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X GET "http://localhost:3000/api/favorites" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>

### **Add Favorite Product** (Auth required)  
`POST /api/favorite/`  

This endpoint allows an authenticated user to add a product to their list of favorite products.  

---

#### **Request**  


**Headers:**  
- `Cookie: connect.sid=<your-session-id>`   

**Body Parameter**  
| Parameter  | Type     | Required | Description  |
|------------|----------|----------|--------------|
| `productId` | `number` | Yes      | The ID of the product to add to the favorites. |

---

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ``` 

---

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/favorites" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{"productId": 123}'
```

---

<br><br>

### **Delete Favorite Product** (Auth required)  
`DELETE /api/favorite/`  

This endpoint removes a specific product from the authenticated user's list of favorite products.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Body Parameters**  

| Parameter    | Type     | Required | Description                               |
|--------------|----------|----------|-------------------------------------------|
| `favId`      | `string` | Yes      | The ID of the favorite product to remove. |

**Validation:**  
- `favId` must be a numeric string.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X DELETE "http://localhost:3000/api/favorite" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "favId": "12345"
}'
```  

---  

<br><br>

## **Order API**  

### **Show Orders** (Auth required)  
`GET /api/order/`  

This endpoint retrieves all orders for the authenticated user.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Parameters:**  
- None  
  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "product_id": "456",
        "name": "Product name",
        "imgage_url": "url",
        "quantity": 2,
        "price_at_purchase": 20,
        "status": "pending" // completed, cancelled,
      },
      {
        "id": "132",
        "product_id": "789",
        "name": "Product name",
        "imgage_url": "url",
        "quantity": 5,
        "price_at_purchase": 200,
        "status": "cancelled" // completed, cancelled,
      }
    ]
  }
  ```  

**Error Responses:**  
  **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X GET "http://localhost:3000/api/orders" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>

### **Show a Order's Details** (Auth required)  
`GET /api/order/:orderId`  

This endpoint retrieves the details of a specific order for the authenticated user.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**URL Parameters:**  
- `orderId` (required): The ID of the order to retrieve the details for.

**Validation:**  
- The `orderId` must be a valid integer.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true,
    "data": {
      "order_id": "123",
      "quantity": 2,
      "price_at_purchase": 55,
      "status": "completed",
      "product_name": "name",
      "product_image_url": "url",
      "shipping_address": "123 Main St, City, Country"
    }
  }
  ```  

**Error Responses:**  
1. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

2. **Order Not Found:**  
   - **Status Code**: `404 Not Found`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Order not found"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X GET "http://localhost:3000/api/order/123" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>

### **Order Product** (Auth required)  
`POST /api/order/product`  

This endpoint allows the authenticated user to place an order for a product with a specified quantity.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  
- `Content-Type: application/json`

**Body Parameters:**  

| Parameter     | Type    | Required | Description                           |
|---------------|---------|----------|---------------------------------------|
| `productId`   | `string`| Yes      | The ID of the product to order.       |
| `quantity`    | `string`| Yes      | The quantity of the product to order. |

**Validation:**  
- `productId` and `quantity` must be numeric strings.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `201 Created`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Product Out of Stock:**  
   - **Status Code**: `409 Conflict`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Not enough stock available"
     }
     ```  

3. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/orders" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "productId": "12345",
  "quantity": "2"
}'
```  

---  

<br><br>

### **Order Cart** (Auth required)  
`POST /api/order/cart`  

This endpoint allows the authenticated user to place an order for all items currently in their cart.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Parameters:**  
- None  

**Validation:**    
- The cart must contain items to proceed with the order.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `201 Created`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Cart is Empty:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Cart is empty"
     }
     ```  

2. **No Stock Available:**  
   - **Status Code**: `409 Conflict`  
   - **Body**:  
     ```json
     {
       "success": false,
       "data": [
          {
            "cart_id": 1,
            "productId": 1,
            "available": 3
          }
         ],
        "message": "Not enough stock available"
       }
     ```  

3. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/order/cart" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>

### **Cancel Order** (Auth required)  
`POST /api/order/cancel`  

This endpoint allows the authenticated user to cancel a specific order.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Body Parameters:**  

| Parameter   | Type    | Required | Description                            |
|-------------|---------|----------|----------------------------------------|
| `orderId`   | `string`| Yes      | The ID of the order to cancel.         |

**Validation:**  
- `orderId` must be a numeric string.  

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true
  }
  ```  

**Error Responses:**  
1. **Invalid Input:**  
   - **Status Code**: `400 Bad Request`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Invalid input"
     }
     ```  

2. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/order/cancel" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>" \
-d '{
  "orderId": "12345"
}'
```  

---  

<br><br>

## **Checkout API**  

### **Checkout Order** (Auth required)  
`POST /api/checkout`  

This endpoint allows the authenticated user to proceed with the checkout process for their cart, retrieving detailed information on the items they are purchasing.  

---  

#### **Request**  

**Headers:**  
- `Cookie: connect.sid=<your-session-id>`  

**Parameters:**  

- None

---  

#### **Response**  

**Success Response:**  
- **Status Code**: `200 OK`  
- **Body**:  
  ```json
  {
    "success": true,
    "data": [
      {
        "price_at_purchase": 29.99,
        "quantity": 2,
        "total_price": 59.98,
        "product_id": "123",
        "product_name": "Product Name"
      },
      {
        "price_at_purchase": 15.99,
        "quantity": 1,
        "total_price": 15.99,
        "product_id": "456",
        "product_name": "Another Product"
      }
    ]
  }
  ```  

**Error Responses:**  
1. **Server Error:**  
   - **Status Code**: `500 Internal Server Error`  
   - **Body**:  
     ```json
     {
       "success": false,
       "message": "Server error"
     }
     ```  

---  

#### **Example Usage**  

**cURL Command:**  
```bash
curl -X POST "http://localhost:3000/api/checkout" \
-H "Content-Type: application/json" \
-H "Cookie: connect.sid=<your-session-id>"
```  

---  

<br><br>
