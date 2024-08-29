// Class representing the Booking Page API interactions
class BookingPage {

  //Method to create a new booking using a POST request
    createBooking(apiToken, bookingDetails) {
      return cy.request({
        method: 'POST',  //specifies the HTTP method as POST for creating a resource
        url: '/booking', // API endpoint for creating a booking
        headers: {       // HTTP headers for authentication and content type
          "x-api-key": apiToken,  // API key for authorization
          'Content-Type': 'application/json',  //Data format being sent
          'Accept': 'application/json'          // Expected response data format
        },	
        body: bookingDetails  // The booking details to be sent in the request body
      });
    }
  
    // Method to retrieve a specific booking using a GET request
    getBooking(apiToken, bookingId) {
      return cy.request({
        method: 'GET',  //specifies the HTTP method as GET for retrieving data
        url: '/booking/' + bookingId,  //API endpoint with booking ID for retrieving specific booking
        headers: {
          "x-api-key": apiToken,
          'Accept': 'application/json'
        }
      });
    }
  
    // Method to update an existing booking using a PUT request
    updateBooking(apiToken, bookingId, updatedDetails) {
      return cy.request({
        method: 'PUT',  // specifies the HTTP method as PUT for updating a resource
        url: '/booking/' + bookingId,  // API endpoint with booking ID for updating a specific booking
        headers: {
          "x-api-key": apiToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='  // Basic auth for additional security
        },
        body: updatedDetails  // The updated booking details to be sent in the request body
      });
    }
  
    // Method to delete a specific booking using a DELETE request
    deleteBooking(apiToken, bookingId) {
      return cy.request({
        method: 'DELETE',  // Specifies the HTTP method as DELETE for removing a resource
        url: '/booking/' + bookingId, // API endpoint with booking ID for deleting a specific booking
        headers: {
          "x-api-key": apiToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
      });
    }
  }
  
  // Export the BookingPage class to be used in other scripts
  export default BookingPage;
  