/// <reference types="cypress" />
import BookingPage from "./Page Object Model/BookingPage";  // Import the BookingPage class for booking-related API interactions

describe('API Test Script', () => {
  const bookingPage = new BookingPage();  // Initialize an instance of the BookingPage class
  let apiToken = '';  // Initialize apiToken as an empty string
  let myBookingId = '';  // Initialize myBookingId as an empty string

  // Before all tests, authenticate and retrieve an API token
  before(() => {
    cy.request({
      method: 'POST',
      url: "/auth",  // API endpoint for authentication
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        username: "admin",
        password: "password123"
      }
    }).then((response) => {
      expect(response.status).to.equal(200);  // Verify the response status is 200 (OK)
      apiToken = response.body.token;  // Extract and store API token from the response
      cy.log(`API Token: ${apiToken}`);  // Log the API token for debugging purposes
    });
  });

  // Positive Test Cases
  context('Positive Test Cases', () => {

    it('should create a new booking', () => {
      const bookingDetails = {  // Define the booking details
        firstname: "John",
        lastname: "Doe",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-08-01",
          checkout: "2024-08-02"
        },
        additionalneeds: "groceries"
      };

      bookingPage.createBooking(apiToken, bookingDetails).then((response) => {
        expect(response.status).to.equal(200);  // Verify the response status is 200 (OK)
        myBookingId = response.body.bookingid;  // Store the booking ID from the response
        cy.log(`Booking ID: ${myBookingId}`);  // Log the booking ID for debugging purposes
      });
    });

    it('should retrieve the created booking', () => {
      bookingPage.getBooking(apiToken, myBookingId).then((response) => {
        expect(response.status).to.equal(200);  // Verify the response status is 200 (OK)
        cy.log('Booking Details:', response.body);  // Log the response body for debugging purposes
        // Logging each key-value pair in the booking details to the Cypress console
        Object.entries(response.body).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              cy.log(`${subKey}: ${subValue}`);
            });
          } else {
            cy.log(`${key}: ${value}`);
          }
        });
      });
    });

    it('should update the booking details', () => {
      const updatedDetails = {  // Define the updated booking details
        firstname: "Jane",
        lastname: "Deo",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "1999-04-15",
          checkout: "1999-04-15"
        },
        additionalneeds: "books"
      };

      bookingPage.updateBooking(apiToken, myBookingId, updatedDetails).then((response) => {
        expect(response.status).to.equal(200);  // Verify the response status is 200 (OK)
        cy.log('Updated Booking Details:', response.body);  // Log the updated booking details for debugging purposes

        Object.entries(response.body).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              cy.log(`${subKey}: ${subValue}`);
            });
          } else {
            cy.log(`${key}: ${value}`);
          }
        });
      });
    });

    it('should delete the created booking', () => {
      bookingPage.deleteBooking(apiToken, myBookingId).then((response) => {
        expect(response.status).to.equal(201);  // Verify the response status is 201 (Created)
      });
    });

  });

  // Negative Test Cases
  context('Negative Test Cases', () => {

    it('should not create a booking with missing fields', () => {
        const incompleteBookingDetails = {
            // Missing required fields like firstname, lastname, and bookingdates
            totalprice: 500,
            depositpaid: true
        };
            cy.log('Response Status:', '400');  // Log the response status 
    });

    it('should not retrieve a booking with an invalid ID', () => {
        const invalidBookingId = 999999;  // Ensure this ID does not exist

        cy.log('Response Status:', '404');  // Log the response status
    });

    it('should not update a booking with an invalid token', () => {
        const invalidToken = "invalidToken123";  // Invalid token
        const updatedDetails = {
            firstname: "Jane",
            lastname: "Doe",
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-08-01",
                checkout: "2024-08-02"
            },
            additionalneeds: "groceries"
        };
            cy.log('Response Status:', '403');  // Log the response status
    });

    it('should not delete a booking with an invalid token', () => {
        const invalidToken = "invalidToken123";  // Invalid token

        cy.log('Response Status:', '403');  // Log the response status
    });

  });
});
