// Importing utility functions, selector constants, page objects, and assertion library to aid in the testing process
const utils = require('../utils/utils.js');
const selectors = require('../Resources/Selectors.js');
const ChooseFlightPage = require('../pageObjects/ChooseFlightPage.js');
const LoadHomePageTest = require('../utils/FlowMethods.js');
const SeatPicker = require('../pageObjects/SeatPicker.js');
const assert = require('assert');

// Class representing the test suite for verifying the seat selection during a return flight booking
class ReturnSeat {
    
    // Constructor to initialize the necessary properties for the test suite
    constructor(driver) {
        this.driver = driver; // WebDriver instance for browser interactions
        this.flightselect = new ChooseFlightPage(driver); // Instance to interact with elements on the flight selection page
        this.test = new LoadHomePageTest(driver); // Instance to initiate the homepage loading test flow
        this.utils = new utils(driver); // Instance to use utility functions defined in utils.js
        this.selectors = selectors; // Object containing selector strings to identify elements on the webpage
        this.seatPick = new SeatPicker(driver); // Instance to interact with elements on the seat picker page
    }

    // Method containing a series of asynchronous operations representing the different steps in the return seat selection test
    async runTests() {
        try {
            
            // Closing any pop-up message that might appear during the test flow
            await this.flightselect.contiuneButtonClick(this.selectors.closeMessageClick);

            // Selecting a random seat using the seat picker instance
            await this.seatPick.pickRandomSeat(this.selectors.randomSeatSelection);

            // Clicking the continue button to proceed to the next step in the booking process
            await this.flightselect.contiuneButtonClick(this.selectors.continueSeatTwo);

            // Closing the fast track option that might appear during the booking process
            await this.flightselect.contiuneButtonClick(this.selectors.closeFastTrack);

            // Asserting that the test navigates to the baggage selection page by confirming the presence of an element on that page
            await this.utils.conFirmElementOnPage(this.selectors.baggagePage);
        
        // Catch block to log any errors that occur during the test execution and fail the test with an assertion
        } catch (error) {
            console.error('Test failed', error); // Logging the error details
            assert.fail('Test failed'); // Failing the test with an assertion
        }
    }
}

// Exporting the ReturnSeat class to allow it to be imported and used in other files
module.exports = ReturnSeat;
