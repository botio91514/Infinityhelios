# Infinity Helios - System Overview & Architecture

**Date:** January 2026
**Version:** 1.0

## 1. Introduction (For Everyone)
**Infinity Helios** is a modern, high-performance e-commerce platform dedicated to Solar Energy solutions. Unlike traditional websites, it is built as a **"Headless" web application**.

*   **What does "Headless" mean?**
    It means the "Face" of the website (what users see) is completely verified and separate from the "Brain" (where data is stored).
    *   **The Face (Frontend):** A custom-built, super-fast interface (like an app) that runs in your browser.
    *   **The Brain (Backend):** WordPress/WooCommerce is used purely as a database to manage products and orders behind the scenes.

**Key Features:**
*   🛍️ **E-commerce**: Browse solar panels, inverters, and batteries.
*   💳 **Secure Payments**: Credit/Debit cards (Stripe) and Direct Bank Transfers.
*   📊 **Dashboard**: Customers can track orders, download PDF invoices, and manage their profiles.
*   ☀️ **Solar Calculator**: A smart tool to estimate potential savings and energy generation.

---

## 2. Technology Stack (For Tech Team)

### **Frontend (The User Interface)**
*   **Framework**: React.js (via Vite) - For a blazing fast Single Page Application (SPA).
*   **Styling**: Tailwind CSS - For responsive, modern, and dark-mode capable design.
*   **Animations**: Framer Motion - For smooth interactions and page transitions.
*   **State Management**: React Context API (Auth, Cart, Loader).

### **Backend (The Bridge)**
*   **Runtime**: Node.js & Express.
*   **Role**: Acts as a **Secure Proxy** and **Business Logic Layer**.
    *   Hides WordPress API keys from the public.
    *   Handles sensitive operations like Stripe Payment Intents.
    *   Adds extra security (Cors, Idempotency).

### **Database & CMS (The Core)**
*   **Platform**: WordPress with WooCommerce.
*   **Role**: Stores Products, Orders, Customers, and content.
*   **API**: WooCommerce REST API (v3) is consumed by our Node.js backend.

---

## 3. System Architecture Flow

```
[ User's Browser ]  <--->  [ Node.js Backend ]  <--->  [ WordPress / WooCommerce ]
(React App on Hostinger)   (Express API on Render)      (CMS Database)
       |                            |
       |                            +---> [ Stripe ] (Payment Processing)
       |
       +---> [ Local Storage ] (Saves Cart Token, Auth Token)
```

---

## 4. Key User Flows (How it Works)

### **A. Buying a Product (Checkout Data Flow)**
1.  **Cart**: User adds items. The App creates a "Session" locally.
2.  **Checkout**: User enters address details.
3.  **Payment Initialization**:
    *   The App asks the **Node Backend**: *"Hey, I want to pay for this Cart."*
    *   The **Node Backend** asks **WooCommerce**: *"Is this cart valid? What's the total?"*
    *   **WooCommerce** confirms the price (preventing frontend price hacking).
    *   **Node Backend** creates a **Stripe Payment Intent** and sends a "Secret Key" back to the App.
4.  **Payment**: The User enters card details directly into a secure Stripe iframe.
5.  **Completion**:
    *   Stripe confirms success.
    *   The App sends the "Success" signal to the Node Backend.
    *   Node Backend tells WooCommerce: *"Create an Order, payment is done!"*
    *   **WooCommerce** sends an email to the Admin & User.

### **B. Dashboard & Management**
*   **Login**: Authenticates against WordPress users via local API.
*   **View Orders**: Fetches live order history from WooCommerce.
*   **Cancel Order**:
    *   User clicks "Cancel" -> Custom Modal appears.
    *   Node Backend verifies user ownership -> Updates Order Status to 'Cancelled' in WooCommerce.
    *   User gets a "Toast" notification.
*   **Invoice**: Generates a professional PDF on the fly using `html2pdf.js` with data from the order.

---

## 5. Directory Structure

### `ih/` (The Frontend)
*   `src/components`: Reusable UI blocks (Navbar, Footer, ProductCard, Toast).
*   `src/pages`: Full pages (Home, Dashboard, Checkout, Invoice).
*   `src/api`: Functions to talk to the backend (`cart.js`, `customer.js`).
*   `src/context`: Global state (User login status, Shopping cart contents).

### `bknd/` (The Backend)
*   `server.js`: The main brain. Contains all API endpoints (`/api/orders`, `/api/create-payment-intent`).
*   `.env`: **CRITICAL**. Stores API Keys (Stripe Secret, WooCommerce Keys).

---

## 6. Security Features (Tech Highlights)
1.  **Idempotency**: Prevents double-charges. If a user clicks "Pay" twice really fast, the server remembers the first request and ignores the second.
2.  **Token Proxying**: The frontend *never* sees the WooCommerce Admin Keys. All requests go through the Node server.
3.  **Price Verification**: Prices are always calculated on the server, never trusted from the frontend.

## 7. Deployment
*   **Frontend**: Hosted on **Hostinger** (Static HTML/JS files).
*   **Backend**: Hosted on **Render** (Node.js Service).
*   **CMS**: Hosted on **InfinityFree/WP Server**.

---
*Created by botio*
