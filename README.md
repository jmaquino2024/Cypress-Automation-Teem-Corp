# Cypress Test Automation

## Overview
This repository contains Cypress test scripts for user registration, login, and company information verification on **FMP Telecom Online**.

## Features
- **User Registration**: Generates a random user and registers on the platform.
- **User Login**: Logs in using the registered credentials.
- **Dashboard Verification**: Ensures successful login and navigation to the dashboard.
- **Company Information & Quote Validation**: Fetches and verifies financial data labels for company profiles and quotes.

## Technologies Used
- [Cypress](https://www.cypress.io/)
- [Cypress XPath](https://www.npmjs.com/package/cypress-xpath)

## Installation & Setup
### Prerequisites
- Node.js (latest stable version)
- npm or yarn

### Steps to Install
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <your-repo-folder>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Tests
To execute the Cypress tests, use the following command:
```sh
npx cypress open
```
This opens the Cypress test runner, where you can select and run the test suite.

For headless execution:
```sh
npx cypress run
```

## Test Cases
### 1. User Registration
- Visits the registration page.
- Fills out and submits the form with a randomly generated user.
- Verifies successful redirection to the dashboard.

### 2. User Login
- Navigates to the login page.
- Logs in with the previously registered credentials.
- Ensures dashboard access.

### 3. Company Information & Quote Verification
- Navigates to the "Company Information" section.
- Enters a stock symbol and verifies financial data labels.
- Moves to "Company Quote" and checks financial data consistency.
