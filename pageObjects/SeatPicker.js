// Import necessary modules from the selenium-webdriver package
const { By, until } = require('selenium-webdriver');
// Importing the assert module for validation
const assert = require('assert');

// Defining the SeatPicker class
class SeatPicker {
    // Constructor method takes a driver object as a parameter and initializes a new SeatPicker with it and an empty array to store selected seats
    constructor(driver) {
        this.driver = driver;
        this.selectedSeats = [];
    }

    // Asynchronous method to randomly pick a seat from the available ones
    async pickRandomSeat(containerXPath, attempt = 1) {
        try {
            
            // Waiting dynamically until the seat container is located in the DOM, with a timeout of 15 seconds
            const seatContainer = await this.driver.wait(until.elementLocated(By.xpath(containerXPath)), 15000);

            // Logging a message indicating the start of the process to find all button elements representing seats
            console.log('About to find all button elements within the seat container');
            
            // Finding all the button elements within the seat container
            const seats = await seatContainer.findElements(By.xpath('.//button'));
            
            // Asserting that there is at least one seat available
            assert(seats.length > 0, 'No seats available');

            let seatSelected = false; // A flag to indicate whether a seat has been selected
            let attempts = 0; // A counter to keep track of the number of attempts made to select a seat
            const maxAttempts = seats.length * 2; // Setting a limit on the maximum number of attempts to avoid an infinite loop

            // Loop to keep trying to select a seat until one is selected or the max attempts are reached
            while (!seatSelected && attempts < maxAttempts) {
                // Generating a random index to pick a seat randomly
                const randomIndex = Math.floor(Math.random() * seats.length);
                const seat = seats[randomIndex];

                // Getting the class attribute of the seat to check its availability
                const seatClass = await seat.getAttribute('class');

                // Checking if the seat is available and not already selected
                if (!seatClass.includes('unavailable') && !this.selectedSeats.includes(seat)) {
                    try {
                        // Executing a script to click the seat and select it
                        await this.driver.executeScript("arguments[0].click();", seat);
                        seatSelected = true; // Setting the flag to true as a seat has been selected
                        this.selectedSeats.push(seat); // Adding the seat to the array of selected seats
                    } catch (error) {
                        // Logging any error that occurs while clicking the seat
                        console.error('Error clicking the seat:', error);
                    }
                }
                attempts += 1; // Incrementing the attempt counter
            }

            // Asserting that a seat was selected after the loop ends
            assert(seatSelected, 'Could not select a seat after multiple attempts');

            // If it's the first attempt, the method calls itself recursively to run a second time
            if (attempt < 2) {
                console.log('Running the method for the second time.');
                await this.pickRandomSeat(containerXPath, attempt + 1);
            }
        } catch (error) {
            // Catching any errors that occur during the process and logging them
            console.error('Error in pickRandomSeat method:', error);
            throw error; // Propagating the error to be handled by the calling code
        }
    }
}

// Exporting the SeatPicker class so it can be used in other files
module.exports = SeatPicker;
