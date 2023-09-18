// Importing the HomePage class to work with methods related to the home page in the test suite
const HomePage = require('../pageObjects/HomePage.js');

// Importing the assert module from Node.js to use assertions in the tests
const assert = require('assert');

// Class representing the test suite for the home page
class HomePageTesting {
    
    // Constructor that initializes a new instance of HomePageTesting with the necessary driver and a new instance of the HomePage class
    constructor(driver) {
        this.driver = driver; // The Selenium WebDriver instance used to interact with the browser
        this.homePage = new HomePage(driver); // Creating a new instance of the HomePage class with the current driver
    }
    
    // Method containing the tests to be run for the home page
    async runTests() {
        
        // Getting a reference to the HomePage instance
        const homePage = this.homePage;
        
        // Getting the title of the home page using the getTitle method of the HomePage class
        const title = await homePage.getTitle();
        
        // Asserting that the title matches the expected pattern, using a regular expression to test the title string
        assert(/^Official Ryanair website \|/.test(title), 'Title did not match');
    }
}

// Exporting the HomePageTesting class so that it can be used in other files
module.exports = HomePageTesting;
