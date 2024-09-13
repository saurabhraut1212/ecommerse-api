# E-commerce API

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [Authentication](#authentication)
  - [Seller Functionality](#seller-functionality)
  - [Buyer Functionality](#buyer-functionality)
  - [Order Management](#order-management)
- [Deployment](#deployment)

---

## Introduction
This project is a simple **E-commerce API** that enables sellers to manage their products and buyers to search for products, manage their cart, place orders. The API includes user authentication and role-based access control for sellers and buyers.

---

## Features
- User authentication with JWT
- Role-based access control (Seller and Buyer)
- Product management for sellers (Add, Edit, Delete)
- Search products by name and category
- Cart management for buyers (Add/Remove products)
- Order management (Buyers can place orders, Sellers can view orders)
- Proper error handling and clear error messages

---

## Tech Stack
- **Node.js** with **Express.js** - Backend API
- **PostgreSQL** - Database
- **jsonwebtoken** - Authentication
- **bcryptjs** - Password hashing
- **pg** - PostgreSQL client

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/saurabhraut1212/ecommerce-api.git

   cd ecommerce-api
   ```
2.**Install dependencies**
 ```bash
  npm install
```
## Database setup
**Setup the database**
  ```bash
   CREATE DATABASE ecommerce-api
```
## Create database tables
-**users**
-**carts**
-**orders**
-**products**

## Environment Variables
- PORT
- JWT_SECRET
- DATABASE_USER
- HOST
- PASSWORD
- DATABASE


---

## API Endpoints
 **Authentication**

| Method | Endpoint               | Description                              | Request Body   |
|--------|------------------------|------------------------------------------|------------------|
| POST   | `/auth/signup`          | User signup (Buyer/Seller)               | {name,email,password,role}              |
| POST   | `/auth/login`           | User login                               | {email,password}             |

**Seller Functionality**

| Method | Endpoint               | Description                              | Request Body   |
|--------|------------------------|------------------------------------------|------------------|
| POST   | `/product/products`          | Add new product(seller only)               | { name, category, description, price, discount}             |
| PUT   | `/product/products/:productId`           |Edit product(seller only)                             | { name, category, description, price, discount}            |
| DELETE   | `/product/products/:productId`           |Delete product(seller only)                             | { name, category, description, price, discount}            |
| GET   | `/product/seller/orders`           |View orders for seller products                            | -           |

**Buyer Functionality**

| Method | Endpoint               | Description                              | Request Body   |
|--------|------------------------|------------------------------------------|------------------|
| GET   | `/product/products`          | Search products by name ,category              | { name, category}(query params)             |
| POST   | `/cart/cart`           |Add product to cart                           | { productId}            |
| DELETE   | `/cart/remove/:productId`           | Remove product from cart                          |          |

**Order management**

| Method | Endpoint               | Description                              | Request Body   |
|--------|------------------------|------------------------------------------|------------------|
| POST   | `/product/orders`          |Place an order(Buyer only)             |{productId,quantity}          |
| GET   | `/product/seller/products`           |View seller's order                         | -           |

## Deployment
  For deployment render is used as a platform
