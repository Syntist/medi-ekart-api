# Medi-Ekart

**A Modern E-Commerce Platform for Medicines**

Medi-Ekart is an advanced e-commerce platform for purchasing medicines online, designed to ensure secure, validated, and seamless transactions for consumers. The platform offers robust features for consumers, medoxers, providers, and admins, ensuring quality assurance and a superior user experience.

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Roles and Responsibilities](#roles-and-responsibilities)
5. [Setup Instructions](#setup-instructions)
6. [Project Links](#project-links)
7. [Sprint Schedule](#sprint-schedule)
8. [Test Cases](#test-cases)
9. [License](#license)

---

## Description

The rise of e-commerce has revolutionized how we shop for daily needs. Medi-Ekart aims to automate the process of purchasing medicines online, addressing common issues like:

- Sale of expired and unauthorized medicines.
- Excessive pricing.
- Difficulty traveling to pharmacies.

The platform offers a seamless experience for consumers, medoxers (validators), providers, and admins.

---

## Features

### For Consumers
- Minimalistic User Interface for purchasing medicines.
- Order tracking and payment systems.
- Secure and stable platform for record management.

### For Medoxers
- Validation of medications and prescriptions.
- Monitoring deliveries to consumers.

### For Providers
- Manage and supply medication stock.

### For Admins
- Manage user roles and validate transactions.

---

## Technologies Used

- **Programming Language**: JavaScript
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Cloud Deployment**: Vercel (Frontend), Oracle Cloud (Backend)

### MERN Stack
- **MongoDB**: Database configuration and management.
- **Express.js**: Backend framework for routing, models, controllers, and authentication.
- **React.js**: Frontend development with state management and form submissions.
- **Node.js**: JavaScript runtime for backend execution.

---

## Roles and Responsibilities

| Team Member                        | Role & Responsibilities                                                                 |
| -----------------------------------| ---------------------------------------------------------------------------------------|
| **Sai Krishna Voruganti**          | Frontend for Medoxer & Provider, Backend logic, ERD, Integration.                     |
| **Syed Talha Khalid**              | Backend, Project Lead, Sprint Management, Deployment (Oracle Cloud).                  |
| **Amrutha Balumuri**               | Order tracking system, Payment system, Frontend for Authentication.                   |
| **Malneedi Venkata Sesha Sai**     | Admin activity page, Frontend for Admin module.                                       |
| **Bhanu Lakshmi Narasimha Tadiboina** | UI components, Frontend (React, Figma).                                             |
| **Divya Gayathri Kolloju**         | Unit & performance testing, Backend development.                                      |

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Syntist/medi-ekart-app.git
   git clone https://github.com/Syntist/medi-ekart-api.git
   ```

2. **Install Dependencies**:
   ```bash
   cd medi-ekart-app
   npm install

   cd ../medi-ekart-api
   npm install
   ```

3. **Configure Environment Variables**:
   Create `.env` files in both the frontend and backend directories with the appropriate configurations (e.g., MongoDB URI, JWT secrets).

4. **Run the Backend**:
   ```bash
   cd medi-ekart-api
   npm start
   ```

5. **Run the Frontend**:
   ```bash
   cd medi-ekart-app
   npm start
   ```

6. **Access the Application**:
   Visit `http://localhost:3000` in your browser.

---

## Project Links

- **Main App GitHub Repository**: [Frontend Repository](https://github.com/Syntist/medi-ekart-app)
- **Backend API GitHub Repository**: [Backend Repository](https://github.com/Syntist/medi-ekart-api)
- **Deployed Website**: [Medi-Ekart Live App](https://medi-ekart-app.vercel.app/)

---

## Sprint Schedule

| Sprint | Duration            | Focus Area                                                                                  |
|--------|--------------------|---------------------------------------------------------------------------------------------|
| **1** | Sept 25 - Oct 6    | Repository setup, database design, initial login, architecture diagrams.                   |
| **2** | Oct 9 - Oct 20     | Consumer, Medoxer, and Provider modules (frontend & backend).                              |
| **3** | Oct 23 - Nov 3     | Admin module, medicines page, activity pages.                                              |
| **4** | Nov 6 - Nov 17     | Cart, order tracking, payment system, integration, and deployment.                         |

---

## Test Cases

### Consumer Login Page

| **Test Case ID** | **Title**          | **Description**                                                                                   | **Steps**                                                       | **Expected Result**                        | **Actual Result**                        |
|------------------|--------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------|------------------------------------------|
| CLP_01           | Consumer Signup    | Navigate to Sign-Up page from Login page.                                                        | Go to Login page, click "Don't have an account?"              | User navigates to Sign-Up page.            | Same as Expected Result                 |
| CLP_02           | Consumer Login     | Login with valid credentials.                                                                    | Enter URL, click Login, enter credentials.                    | Consumer logs in successfully.             | Same as Expected Result                 |

### Consumer Profile Page

| **Test Case ID** | **Title**           | **Description**                                                                                   | **Steps**                                                       | **Expected Result**                        | **Actual Result**                        |
|------------------|---------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------|------------------------------------------|
| CPP_01           | Consumer Details    | Edit and save consumer profile details.                                                          | Login, go to profile, edit details, save.                     | Profile details are saved successfully.    | Same as Expected Result                 |

### Medoxer Login Page

| **Test Case ID** | **Title**           | **Description**                                                                                   | **Steps**                                                       | **Expected Result**                        | **Actual Result**                        |
|------------------|---------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------|------------------------------------------|
| MLP_01           | Medoxer Signup      | Navigate to Sign-Up page from Login page.                                                        | Go to Login page, click "Don't have an account?"              | User navigates to Sign-Up page.            | Same as Expected Result                 |
| MLP_02           | Medoxer Login       | Login with valid credentials.                                                                    | Enter URL, click Login, enter credentials.                    | Medoxer logs in successfully.              | Same as Expected Result                 |

### Medoxer Activity Page

| **Test Case ID** | **Title**                          | **Description**                                                                                   | **Steps**                                                       | **Expected Result**                        | **Actual Result**                        |
|------------------|------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------|--------------------------------------------|------------------------------------------|
| MAP_01           | Validating Customer Prescription  | Medoxer validates a customer prescription.                                                       | Login, validate prescription.                                 | Prescription validated successfully.       | Same as Expected Result                 |
| MAP_02           | Validating Provider Requests      | Medoxer validates provider requests.                                                             | Login, validate provider request.                             | Request validated successfully.            | Same as Expected Result                 |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Citations

- [Public Perception toward E-commerce of Medicines](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6662035/)
- [Consumers Turning to the Internet Pharmacy Market](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6125612/)
- [Understanding the Rise of Digital Pharmacies](https://pharmanewsintel.com/features/understanding-the-rise-of-digital-pharmacies)

# SERVER

- yarn install
- yarn start
- http://localhost:8080
