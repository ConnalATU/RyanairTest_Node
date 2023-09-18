// Importing the necessary modules and classes
const utils = require('../utils/utils.js');  // Utilities module to facilitate various operations in the tests
const selectors = require('../Resources/Selectors.js');  // Object containing the selectors for various elements to be interacted with in the tests
const ChooseFlightPage = require('../pageObjects/ChooseFlightPage.js');  // Class representing the page object for the flight selection page

// Unused variable 'flightselect', consider removing it if it's not needed
let flightselect;

// Class representing the set of tests for picking a flight
class FlightPick {
    
    // Constructor to initialize a new instance of FlightPick with the necessary dependencies
    constructor(driver) {
        this.driver = driver;  // The Selenium WebDriver instance used to interact with the browser
        this.flightselect = new ChooseFlightPage(driver);  // An instance of the ChooseFlightPage class to facilitate interactions specific to the flight selection page
        this.utils = new utils(driver);  // An instance of the utils class to facilitate various utility operations
        this.selectors = selectors;  // Reference to the object containing the necessary selectors
    }

    // Method containing the tests to be run for flight selection
    async runTests() {
        try {
            // Selecting the first and second flights using the selectors specified in the selectors module
            await this.flightselect.selectFlight(this.selectors.selectFlightOne);
            await this.flightselect.selectFlight(this.selectors.selectFlightTwo);

            // Selecting a regular flight option
            await this.flightselect.clickRegular(this.selectors.clickRegular);

            // Calling a method from the utils module to perform a series of operations as part of the flight selection flow
            await this.utils.flightFlow(this.selectors.loginMenu, this.selectors.passengersForm);
        } catch (error) {
            // Logging any error encountered during the execution of the test method
            console.log('Error in the method:', error);

            // Rethrowing the error to indicate a failure in the test, allowing Mocha or any other test runner to recognize the test as failed
            throw error;  
        }
    }
}

// Exporting the FlightPick class so it can be used in other files
module.exports = FlightPick;
