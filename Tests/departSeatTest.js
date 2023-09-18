// Importing necessary utility functions, selector constants, and classes
const utils = require('../utils/utils.js');
const selectors = require('../Resources/Selectors.js');
const ChooseFlightPage = require('../pageObjects/ChooseFlightPage.js');
const LoadHomePageTest = require('../utils/FlowMethods.js');
const SeatPicker = require('../pageObjects/SeatPicker.js');
const assert = require('assert');

/**
 * Class representing the test suite for DepartSeat
 */
class DepartSeat {
    
    /**
     * Create a DepartSeat test suite instance.
     */
    constructor(driver) {
        this.driver = driver;  // WebDriver object for browser interactions
        this.flightselect = new ChooseFlightPage(driver);  // Class instance to interact with the flight selection page
        this.test = new LoadHomePageTest(driver);  // Class instance to interact with the home page
        this.utils = new utils(driver);  // Utility functions for common operations
        this.selectors = selectors;  // Selectors imported from a centralized selector file
        this.seatPick = new SeatPicker(driver);  // Class instance to interact with the seat picker
    }

    /**
     * Method to run the defined tests for the DepartSeat suite.
     * The method encompasses a series of operations performed sequentially 
     * to complete a part of the flight booking workflow.
     * Error handling is implemented to catch any failures and log them for review.
     */
    async runTests() {
        try {
            // Invoking method to pick a random seat from the available options
            await this.seatPick.pickRandomSeat(this.selectors.pickSeatRandom);
            
            // Proceeding to the next phase of the booking process by clicking the 'continue' button
            await this.flightselect.contiuneButtonClick(this.selectors.continueClick);
        
            // Verifying the navigation to the correct page by confirming the presence of a specific element on the page
            await this.utils.conFirmElementOnPage(this.selectors.seatSecondPage);
        
        } catch (error) {
            // Logging the error message in the console
            console.error('Test failed', error);
            // Failing the test due to the catch block being entered, indicating a test failure
            assert.fail('Test failed');
        } 
    }
}

// Exporting the class to allow it to be used in other modules
module.exports = DepartSeat;
