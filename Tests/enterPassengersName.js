// Import necessary utilities and selectors
const utils = require('../utils/utils.js');
const selectors = require('../Resources/Selectors.js');

// Import necessary classes for page objects and methods
const ChooseFlightPage = require('../pageObjects/ChooseFlightPage.js');
const LoadHomePageTest = require('../utils/FlowMethods.js');

// Definition of the EnterPassengersName class
class EnterPassengersName {
    
    // Constructor takes a driver object as a parameter and initializes the flightselect object
    constructor(driver) {
        this.driver = driver;  // WebDriver instance to control the browser
        this.flightselect = new ChooseFlightPage(driver);  // Creating an instance of the ChooseFlightPage class
        this.test = new LoadHomePageTest(driver);  // Creating an instance of the LoadHomePageTest class
        this.utils = new utils(driver);  // Creating an instance of utils class
        this.selectors = selectors;  // Object containing selector strings
    }

    // Method to run a series of tests
    async runTests() {
        try {
            // Entering the details of the first passenger using the defined selectors and sample data
            await this.flightselect.enterName(
                this.selectors.enterName1.nameSelector, 
                this.selectors.enterName1.firstName, 
                this.selectors.enterName1.surnameSelector, 
                this.selectors.enterName1.lastName, 
                this.selectors.enterName1.titleButtonSelector, 
                this.selectors.enterName1.titleOptionSelector
            ); 
             
            // Entering the details of the second passenger using the defined selectors and sample data
            await this.flightselect.enterName(
                this.selectors.enterName2.nameSelector, 
                this.selectors.enterName2.firstName, 
                this.selectors.enterName2.surnameSelector, 
                this.selectors.enterName2.lastName, 
                this.selectors.enterName2.titleButtonSelector, 
                this.selectors.enterName2.titleOptionSelector
            );
    
            // Clicking the continue button after entering the passenger details
            await this.flightselect.contiuneButtonClick(this.selectors.afterNameContinue);
    
            // Verifying the presence of the seat picker on the page using a utility function
            await this.utils.conFirmElementOnPage(this.selectors.pickSeatRandom);
                
            // Additional steps and assertions can be added here...
        } catch (error) {
            // Logging the error in case of a failure and asserting the test as failed
            console.error('Test failed', error);
            assert.fail('Test failed');
        }
    }
}

// Exporting the class to allow it to be used in other modules
module.exports = EnterPassengersName;
