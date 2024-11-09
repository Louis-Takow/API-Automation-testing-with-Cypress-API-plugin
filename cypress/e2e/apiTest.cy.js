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
        lastname: "Doll",
        totalprice: 2500,
        depositpaid: false,
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

    it('should partially update the booking details', () => {
      const updatedDetails = {  // Define the updated partial booking details
        firstname: "James",
        lastname: "Brown",
      };

      bookingPage.partialyUpdateBooking(apiToken, myBookingId, updatedDetails).then((response) => {
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
        expect(response.status).to.equal(201);  // Verify the response status is 201
      });
    });

  });

  // Negative Test Cases
  context('Negative Test Cases', () => {
    it('should not create a booking with missing fields', () => {
      cy.request({
        method: 'POST',
        url: '/booking',
        body: {
          totalprice: 500,
          depositpaid: true
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500); // Verify the response status is 500
      });
    });    
  
    it('should not retrieve a booking with an invalid ID', () => {
      cy.request({
        method: 'GET',
        url: '/booking/999999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404); // Verify the response status is 404
      });
    });
  
    it('should not update a booking with an invalid token', () => {
      cy.request({
        method: 'PUT',
        url: '/booking/792',
        headers: {
          'x-api-key': 'invalidToken123',
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        body: {
          firstname: 'Jane',
          lastname: 'Doe',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-08-01',
            checkout: '2024-08-02'
          },
          additionalneeds: 'groceries'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405); // Verify the response status is 405
      });
    });

    it('should not partially update a booking with invalid token', () => {
      cy.request({
        method: 'PATCH',
        url: '/booking/792',
        headers: {
          'x-api-key': 'invalidToken123',
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        body: {
          firstname: 'Johnny',
          totalprice: 700,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405); // Verify the response status is 405
      });
    });
    
    it('should not delete a booking with an invalid token', () => {
      cy.request({
        method: 'DELETE',
        url: '/booking/792',
        headers: {
          'x-api-key': 'invalidToken123', 
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM=',
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(405); // Verify the response status is 405
      });
    });    
  });
  
});
