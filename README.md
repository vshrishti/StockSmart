# StockSmart – Retail Inventory Optimization

A modern, full-stack Retail Inventory Management System built to help businesses track their products and optimize their stock levels efficiently. 

## Problem Statement

Retail businesses often face challenges in tracking inventory, monitoring stock levels, and preventing product shortages. StockSmart addresses these issues by providing a centralized inventory management system that enables efficient product tracking, automated low-stock alerts, and streamlined stock management.

## 🚀 Tech Stack
- **Frontend:** Angular 17, TypeScript, HTML5, CSS3
- **Backend:** Java, Spring Boot, Spring Web
- **Database:** MySQL, Spring Data JPA, Hibernate

## ✨ Key Features
- **Interactive Dashboard:** Get a bird's-eye view of your inventory with real-time statistics (Total Products, Total Stock, Low Stock Items).
- **Automated Stock Logic:** Products are automatically flagged visually based on availability:
  - 🟢 **IN STOCK** (Normal quantity)
  - 🟡 **LOW STOCK** (Quantity <= 10)
  - 🔴 **OUT OF STOCK** (Quantity = 0)
- **Full CRUD Operations:** Seamlessly Add, Edit, Delete, and View products.
- **RESTful API:** Clean, stateless communication between the Angular UI and Spring Boot backend.
- **Responsive Design:** Clean, dynamic, and intuitive user interface built with modern CSS methodologies.

## 🛠️ How to Run Locally

### 1. Database Setup
1. Ensure you have MySQL running locally on port `3306`.
2. Update your credentials in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

### 2. Start the Backend
1. Open a terminal in the `backend` folder.
2. Run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
   ```
*(The backend will start on `http://localhost:8080` and automatically create the database tables).*

### 3. Start the Frontend
1. Open a terminal in the `frontend` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Angular server:
   ```bash
   npm start
   ```
*(The frontend will start on `http://localhost:4200`).*
