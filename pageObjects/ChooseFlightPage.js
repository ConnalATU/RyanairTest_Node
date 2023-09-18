// Importing necessary modules from the selenium-webdriver package
const { By, Key, until } = require('selenium-webdriver');
// Importing the LoginComponent class
const LogInComponent = require('./LoginComponent');

// Defining the ChooseFlightPage class
class ChooseFlightPage {
    // Constructor method to initialize the ChooseFlightPage class with a driver instance and a new instance of the LoginComponent class
    constructor(driver) {
        this.driver = driver;
        this.LogInComponent = new LogInComponent(driver);
    }

    // Method to select a flight based on the provided flight selector (XPath)
    async selectFlight(flightSelector) {
        try {
            // Waiting until the flight element is located and then clicking it to select the flight
            const flight = await this.driver.wait(until.elementLocated(By.xpath(flightSelector)), 35000);
            await flight.click();
            console.log("Flight selected successfully.");
            await this.driver.sleep(5000);  // Pausing execution for 5 seconds to allow page to load
        } catch (error) {
            // Logging and rethrowing any error that occurs during execution
            console.log('Error in selectFlight method:', error);
            throw error; 
        }
    }

    // Method to select the 'Regular' option based on the provided regular selector (XPath)
    async clickRegular(regularSelector) {
        try {
            // Waiting until the 'Regular' element is located and visible, then clicking it to select the option
            const regular = await this.driver.wait(until.elementLocated(By.xpath(regularSelector)), 5000);
            await this.driver.wait(until.elementIsVisible(regular), 5000);
            await regular.click();
            console.log("Regular selected successfully.");
        } catch (error) {
            // Logging any error that occurs during execution
            console.log('Error in clickRegular method:', error);
        }
    }

    // Method to enter the passenger's name using the provided selectors (XPath) and name values
    async enterName(selectorFirstName, firstName, selectorSecondName, secondName, selectorTitleBox,selectorTitle) {
        try {
            // Entering the first name using the provided selector and value
            await this.driver.sleep(2000);  // Pausing execution for 2 seconds to allow page elements to load
            const inputFirstName = await this.driver.findElement(By.xpath(selectorFirstName));
            await inputFirstName.click();
            await inputFirstName.sendKeys(firstName);

            // Entering the second name using the provided selector and value
            await this.driver.sleep(2000);
            const inputSecondName = await this.driver.findElement(By.xpath(selectorSecondName));
            await inputSecondName.click();
            await inputSecondName.sendKeys(secondName);

            // Selecting the title from a dropdown using the provided selectors
            await this.driver.sleep(2000);
            const titleBox = await this.driver.findElement(By.xpath(selectorTitleBox));
            await titleBox.click();
            await this.driver.sleep(2000);
            const title = await this.driver.findElement(By.xpath(selectorTitle));
            await title.click();
        } catch (error) {
            // Logging any error that occurs during execution
            console.error('Could not enter name', error);
        }
    }

    // Method to click the 'Continue' button using the provided button selector (XPath)
    async contiuneButtonClick(continueButtonSelector) {
        try {
            // Locating the 'Continue' button and clicking it to proceed to the next page
            const contuineButton = await this.driver.findElement(By.xpath(continueButtonSelector));
            await this.driver.wait(until.elementIsVisible(contuineButton), 10000);
            await contuineButton.click();
            await this.driver.sleep(3000);  // Pausing execution for 3 seconds to allow page to load
        } catch (error) {
            // Logging any error that occurs during execution
            console.log('Error in clickSearchButton method:', error);
        }
    }
}

// Exporting the ChooseFlightPage class to allow it to be imported and used in other files
module.exports = ChooseFlightPage;
