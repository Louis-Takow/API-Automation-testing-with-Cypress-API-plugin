# API Automation GOZEM

This project focuses on developing automated API tests using Cypress.io. For additional details about Cypress, visit [Cypress.io](https://www.cypress.io).

## Prerequisites

- **Node.js:** Ensure you have the latest version installed. You can download it from [Node.js](https://nodejs.org/).
- **IDE:** It is recommended to use Visual Studio Code as your Integrated Development Environment (IDE) for this project.

## Setup Instructions

1. **Clone this repository** using your preferred command line tool.
2. Navigate to the project directory after cloning by executing cd GOZEM-Technical-Assessment in your terminal or PowerShell.
   
''' command line terminal
Copy code
git clone <repository-url>
cd GOZEM-Technical-Assessment

3.	Install all necessary dependencies and Cypress by running the following commands:

''' command line terminal
Copy code
npm install
npx cypress install
npx cypress open

4.	Run test and open Mochawesome report using the following command:

''' command line terminal
Copy code
npm run cypress: run

## Running the Tests
1.	On the Cypress dashboard, you will be greeted with options for E2E Testing and Component Testing. Since we are focusing on API automation, select E2E Testing.
2.	The default browser will be Chrome. It is not necessary to choose a different browser; simply click on Start E2E Testing in Chrome.
3.	A new browser window will open with the test dashboard. Locate and click on the apiTest.cy.js file to run the tests.
4.	You can monitor the execution results by clicking on the steps listed on the left side of the dashboard to check which tests passed or failed.

## Test Details
### Overview
This automation assessment focuses on validating booking operations for both positive and negative cases.
•	**Reference Types:** The directive /// <reference types="cypress" /> at the top of the file ensures Cypress types are available for IntelliSense and type checking.
•	**Describe Block:** The describe block organizes all tests related to booking operations into context of positive and negative test suits.
•	**Variables:** apiToken, myBooking, and myBookingId are used to store the API token, booking details, and booking ID respectively.
•	**Before Hook:** The before hook executes once before any tests. It sends a POST request for authentication and retrieves an API token, which is saved in the apiToken variable.

## Test Scenarios
### Creating a Booking:
•	Sends a POST request to initiate a new booking.
•	Confirms that the response status is 200.
•	Logs the response and saves the booking ID in myBookingId.
### Reading a Booking:
•	Sends a GET request to fetch booking details using the stored booking ID.
•	Confirms that the response status is 200.
•	Logs the booking details and iterates through each key-value pair for detailed logging.
### Updating a Booking:
•	Sends a PUT request to modify the booking details using the stored booking ID.
•	Confirms that the response status is 200.
•	Logs the updated booking details and iterates through each key-value pair for detailed logging.
### Partialy Updating a Booking:
•	Sends a PATCH request to partialy modify the booking details using the stored booking ID.
•	Confirms that the response status is 200.
•	Logs the updated booking details and iterates through each key-value pair for detailed logging.
### Deleting a Booking:
•	Sends a DELETE request to remove the booking using the stored booking ID.
•	Confirms that the response status is 201.

## Best Practices
•	**Page Object Model (POM):** Applied to encapsulate API operations within a BookingPage class for improved organization and reusability.
•	**Separation of Concerns:** Ensures that each test case focuses on a specific operation, enhancing readability and maintainability.
•	**Response Validation:** Ensures that each API response is verified for correct status codes and data consistency.
•	**Data Management:** Separate test data from script by creating a base-URL global variable in the Cypress.config.js file. This helps in reusability of test data throughout the script
•	**Validate Positive and Negative Path:** Testing valid, invalid and unexpected conditions.
•  **Generation of Test report after Execution**: To integrate the Mochawesome report which is most compatible with Cypress to generate a report after test run to display test outcome in detail.



