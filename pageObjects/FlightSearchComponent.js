// Importing necessary functionalities from the selenium-webdriver package
const { By, Key, until } = require('selenium-webdriver');

// Defining the FlightSearchComponent class
class FlightSearchComponent {
    // Constructor method to initialize the FlightSearchComponent class with a driver instance
    constructor(driver) {
        this.driver = driver;
    }

    // Method to enter a country name in a field and select an airport from the suggestions
    async enterCountryAndSelectAirport(fieldSelector, country, optionSelector) {
        // Locating the country field and clicking it to activate
        const countryField = await this.driver.findElement(By.css(fieldSelector));
        await countryField.click();
        
        // Clearing the field using CTRL+A to select all text and DELETE to remove it
        await countryField.sendKeys(Key.CONTROL, "a");
        await countryField.sendKeys(Key.DELETE);
        
        // Entering the country name
        await countryField.sendKeys(country);
        
        // Waiting for a while to allow suggestions to appear
        await this.driver.sleep(2000);
        
        // Selecting a specific airport from the suggestions
        const specificAirport = await this.driver.findElement(By.css(optionSelector));
        await specificAirport.click();
    }

    // Method to select a date from a date picker component
    async selectDate(dateFieldSelector, monthButtonSelector, dateSelector) {
        try {
            // Waiting to ensure the date picker is open
            await this.driver.sleep(1000);
    
            // Opening the month selector by clicking the month button
            let monthButton = await this.driver.findElement(By.css(monthButtonSelector));
            await monthButton.click();
    
            // Checking if the calendar is displayed
            let isDisplayed = await monthButton.isDisplayed();

            // If the calendar is not displayed, clicking the date field to open the calendar
            if (!isDisplayed) {
                await dateField.click();
                // Waiting to ensure the calendar has time to open
                await this.driver.sleep(1000);
            }
            // Waiting to ensure the month selector is open
            await this.driver.sleep(1000);
    
            // Selecting the desired date
            let date = await this.driver.findElement(By.xpath(dateSelector));
            await date.click();
    
            // Waiting to ensure the date is selected
            await this.driver.sleep(1000);
        } catch (error) {
            // Logging any error that occurs during execution
            console.log('Error in selectDate method:', error);
        }
    }

    // Method to add passengers and confirm the selection by clicking the "Done" button
    async addPassengersAndClickDone(plusButtonSelector, doneButtonSelector) {
        try {
            // Finding and clicking the plus button to add more passengers
            const plusButton = await this.driver.findElement(By.css(plusButtonSelector));
            await plusButton.click();
    
            // Finding and clicking the "Done" button to confirm the selection
            const doneButton = await this.driver.findElement(By.css(doneButtonSelector));
            await doneButton.click();
        } catch (error) {
            // Logging any error that occurs during execution
            console.log('Error in addPassengersAndClickDone method:', error);
        }
    }

    // Method to enter the return date (note: this method currently lacks implementation details)
    async enterReturnDate(date) {
        await this.returnDateField.sendKeys(date);
    }

    // Method to initiate the search by clicking the search button
    async clickSearchButton(searchButtonSelector) {
        try {
            // Locating the search button using its CSS selector
            const searchButton = await this.driver.findElement(By.css(searchButtonSelector));
            
            // Clicking the search button to initiate the search
            await searchButton.click();
        } catch (error) {
            // Logging any error that occurs during execution
            console.log('Error in clickSearchButton method:', error);
        }
    }
}

// Exporting the FlightSearchComponent class so it can be imported and used in other scripts
module.exports = FlightSearchComponent;
