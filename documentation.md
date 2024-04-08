# Project Development Documentation

## Introduction

Welcome to the development documentation for our e-commerce platform project. This document serves as a guide for developers working on this project, providing information about the architecture, setup, and usage.

## Project Overview

Our e-commerce platform is built to enable users to browse, search, and purchase products online. It follows a client-server architecture, with a backend API providing data and functionality to a frontend web application.

## Technologies Used

- **Backend:**
    - Node.js
    - Express.js
    - MongoDB


## Setup Instructions

1. **Clone the Repository:**
   git clone https://github.com/sonaisrayel/e-shop-group1.git


2. **Navigate to the Project Directory:**
   cd e-shop-group1

3. **Install Dependencies for Backend and Frontend:**

cd backend
npm install


4. **Start the Backend Server:**
npm start


6. **Access the Application:**
   Open your web browser and go to `http://localhost:3000`.

## Backend API Endpoints

### Authentication

- **POST /api/auth/register**
- **Description:** Registers a new user.
- **Request Body:**
 ```json
 {
   "name": "John Doe",
   "email": "user@example.com",
   "password": "password123"
 }
 ```
- **Response:**
 ```json
 {
   "message": "User registered successfully"
 }
 ```

- **POST /api/auth/login**
- **Description:** Authenticates a user and generates a JWT token.
- **Request Body:**
 ```json
 {
   "email": "user@example.com",
   "password": "password123"
 }
 ```
- **Response:**
 ```json
 {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
   "user": {
     "id": "1234567890",
     "name": "John Doe",
     "email": "user@example.com"
   }
 }
 ```

### Products

- **GET /api/products**
- **Description:** Retrieves a list of all products.
- **Response:**
 ```json
 [
   {
     "id": "1",
     "name": "Product 1",
     "description": "Description of Product 1",
     "price": 10.99,
     "imageUrl": "https://example.com/product1.jpg"
   },
   {
     "id": "2",
     "name": "Product 2",
     "description": "Description of Product 2",
     "price": 19.99,
     "imageUrl": "https://example.com/product2.jpg"
   },
   ...
 ]
 ```

- **GET /api/products/:id**
- **Description:** Retrieves details of a specific product.
- **Response:**
 ```json
 {
   "id": "1",
   "name": "Product 1",
   "description": "Description of Product 1",
   "price": 10.99,
   "imageUrl": "https://example.com/product1.jpg"
 }
 ```

- **POST /api/products**
- **Description:** Adds a new product.
- **Request Body:**
 ```json
 {
   "name": "New Product",
   "description": "Description of New Product",
   "price": 29.99,
   "imageUrl": "https://example.com/newproduct.jpg"
 }
 ```
- **Response:**
 ```json
 {
   "message": "Product added successfully"
 }
 ```

- **PUT /api/products/:id**
- **Description:** Updates details of a specific product.
- **Request Body:**
 ```json
 {
   "name": "Updated Product",
   "description": "Updated Description of Product",
   "price": 39.99,
   "imageUrl": "https://example.com/updatedproduct.jpg"
 }
 ```
- **Response:**
 ```json
 {
   "message": "Product updated successfully"
 }
 ```

- **DELETE /api/products/:id**
- **Description:** Deletes a specific product.
- **Response:**
 ```json
 {
   "message": "Product deleted successfully"
 }
 ```



