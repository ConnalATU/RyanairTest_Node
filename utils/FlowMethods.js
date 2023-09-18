// Load necessary modules
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const selectors = require('../Resources/Selectors.js');

// Load the HomePage class
const HomePage = require('../pageObjects/HomePage.js'); 

// Declare a variable to hold an instance of HomePage
let homePage;

class LoadHomePageTest {
    constructor(driver) {
        // Store the driver instance and create a new instance of HomePage
        this.driver = driver;
        homePage = new HomePage(driver);  
    }

    // Method to check the display of the "Passengers" section on the page
    async checkPassengerSectionDisplay() {
        try {
            // Wait until the "Passengers" section is present in the DOM
            const passengersSection = await this.driver.wait(until.elementLocated(By.xpath(selectors.passengersSection)), 10000);
            
            // Check if the "Passengers" section is visible to the user
            const isDisplayed = await passengersSection.isDisplayed();
            
            // Log and assert the visibility of the "Passengers" section
            if (isDisplayed) {
                console.log('The "Passengers" displayed');
                assert.ok(true, 'The "Passengers" displayed');
            } else {
                console.log('The "Passengers" can not be seen');
                assert.fail('The "Passengers" can not be seen');
            }
        } catch (error) {
            // Log error details if there is any issue in the above process
            console.error('Error in checkPassengerSectionDisplay function:', error);
            assert.fail('Error encountered while checking the "Passengers" section display');
        }
    }
    
    // Method to run the main test scenario
    async run2() {
        try {
            // Get the FlightSearchComponent from the HomePage instance
            const FlightSearchComponent = homePage.FlightSearchComponent;
            
            // Set the departure and destination airports
            await FlightSearchComponent.enterCountryAndSelectAirport(selectors.departureAirportInput, 'Ireland', selectors.irelandAirportSelection);
            await FlightSearchComponent.enterCountryAndSelectAirport(selectors.destinationAirportInput, 'Spain', selectors.spainAirportSelection);
            
            // Set the departure and return dates
            await FlightSearchComponent.selectDate(selectors.departureDateInput, selectors.departureMonthSelection, selectors.departureDaySelection);
            await FlightSearchComponent.selectDate(selectors.returnDateInput, selectors.returnMonthSelection, selectors.returnDaySelection);
    
            // Add passengers and finalize the passenger selection
            await FlightSearchComponent.addPassengersAndClickDone(selectors.addPassengerButton, selectors.doneButton);
            
            // Start the flight search
            await FlightSearchComponent.clickSearchButton(selectors.searchButton);
    
            // Log the progress of the test
            console.log("Waiting for the search results page to load...");
            console.log("The search results page has loaded.");
    
            console.log("Waiting for the details to load...");
            // Wait until the details are loaded on the results page
            await this.driver.wait(until.elementLocated(By.xpath(selectors.detailsLoadingXPath)), 10000);
            console.log("The details have loaded.");
    
            // Pause the execution for 3 seconds to allow all elements to load properly
            await this.driver.sleep(3000);
    
            // Retrieve and store details from the results page
            const displayedDepartureAirport = await this.driver.findElement(By.xpath(selectors.displayedDepartureAirportXPath)).getText();
            const displayedArrivalAirport = await this.driver.findElement(By.xpath(selectors.displayedArrivalAirportXPath)).getText();
            
            // Retrieve the text containing date and number of persons details
            const allText = await this.driver.findElement(By.xpath(selectors.displayedDepartureDateXPath)).getText();
            
            // Define regular expressions to extract specific details from the retrieved text
            const regexDepartureDate = /Return\s*(\d{1,2}\s[A-Za-z]{3})\s*-\s*\d{1,2}\s[A-Za-z]{3}/;
            const regexReturnDate = /Return\s*\d{1,2}\s[A-Za-z]{3}\s*-\s*(\d{1,2}\s[A-Za-z]{3})/;
            const regexNumberOfPersons = /Return\s*\d{1,2}\s[A-Za-z]{3}\s*-\s*\d{1,2}\s[A-Za-z]{3}\s*(\d+)/;
            
            // Extract specific details using the defined regular expressions
            const matchDepartureDate = allText.match(regexDepartureDate);   
            const matchReturnDate = allText.match(regexReturnDate);
            const matchNumberOfPersons = allText.match(regexNumberOfPersons);
            
            // Store the extracted details
            const displayedDepartureDate = matchDepartureDate ? matchDepartureDate[1] : null;
            const displayedReturnDate = matchReturnDate ? matchReturnDate[1] : null;
            const displayedNumberOfPersons = matchNumberOfPersons ? matchNumberOfPersons[1] : null;
            
            // Pause the execution for 3 seconds before ending the test
            await this.driver.sleep(3000);
    
            // Return the retrieved details for further verification
            return {
                displayedDepartureAirport,
                displayedArrivalAirport,
                displayedDepartureDate,
                displayedReturnDate,
                displayedNumberOfPersons
            };
        } catch (error) {
            // Log error details if there is any issue in the test execution
            console.log('Error in the test:', error);
            assert.fail('Test failed');
        }
    }
}

// Export the LoadHomePageTest class to use it in other modules
module.exports = LoadHomePageTest;
