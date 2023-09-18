// Importing the selectors object which contains the CSS selectors used to locate elements on the web page
const selectors = require('../Resources/Selectors.js');

// Importing the ChooseFlightPage class to interact with elements on the flight selection page
const ChooseFlightPage = require('../pageObjects/ChooseFlightPage.js');

// Importing the LoadHomePageTest class to initiate and execute home page loading test flows
const LoadHomePageTest = require('../utils/FlowMethods.js');

// Declaring variables to hold instances of the ChooseFlightPage and LoadHomePageTest classes, to be initialized in the constructor
let flightselect;
let test;

// Class representing the test suite for verifying the skip login functionality
class SkipLogin {

    // Constructor to initialize necessary properties for the test suite
    constructor(driver) {
        this.driver = driver; // WebDriver instance for browser interactions
        this.flightselect = new ChooseFlightPage(driver); // Instance to interact with elements on the flight selection page
        this.test = new LoadHomePageTest(driver); // Instance to initiate the homepage loading test flow
        this.selectors = selectors; // Object containing selector strings to identify elements on the webpage
    }

    // Method containing asynchronous operations representing the different steps in the skip login test
    async runTests() {
        try {
            // Getting the LogInComponent instance from the flightselect object
            const skipLogin = this.flightselect.LogInComponent;

            // Invoking the LoginClick method with the skipLoginButton selector to skip the login process
            await skipLogin.LoginClick(selectors.skipLoginButton);

            // Verifying that the passengers section is displayed correctly after skipping the login
            await this.test.checkPassengerSectionDisplay(selectors.passengersSection);
            
        } catch (error) {
            // If an error occurs during the test execution, logging the error details and a custom message to the console
            console.log('Error:', error);
            console.log('The "Passengers" section is not found or does not have the disabled class');
            
            // Failing the test with a specific assertion message indicating the reason for the failure
            assert.fail('The "Passengers" section is not correctly disabled');
        }
    }
}

// Exporting the SkipLogin class so that it can be imported and used in other files
module.exports = SkipLogin;
