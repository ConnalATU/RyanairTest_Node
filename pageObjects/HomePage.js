const { By, until } = require('selenium-webdriver');
const FlightSearchComponent = require('./FlightSearchComponent');
const selectors = require('../Resources/Selectors.js'); // Importing the selectors module

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.FlightSearchComponent = new FlightSearchComponent(driver);
    }

    // Method to open the Ryanair home page
    async open() {
        await this.driver.get('https://www.ryanair.com/');
    }

    // Method to handle the cookie acceptance pop-up
    async acceptCookies() {
        try {
            // Wait for the cookie pop-up to appear and locate the "Accept" button using the selector imported from the selectors module
            await this.driver.wait(until.elementLocated(By.css(selectors.acceptCookiesButton)), 10000);
            
            // Click the "Accept" button to close the cookie pop-up
            const acceptCookiesButton = await this.driver.findElement(By.css(selectors.acceptCookiesButton));
            await acceptCookiesButton.click();
        } catch (error) {
            console.log('Could not find the accept cookies button', error);
        }
    }

    // Method to close any additional pop-ups that appear on the page
    async closePopup() {
        try {
            // Wait for the pop-up to appear and locate the close button using the selector imported from the selectors module
            await this.driver.wait(until.elementLocated(By.css(selectors.closePopupButton)), 10000);
            
            // Click the close button to close the pop-up
            const closePopupButton = await this.driver.findElement(By.css(selectors.closePopupButton));
            await closePopupButton.click();
        } catch (error) {
            console.log('Could not find the popup close button', error);
        }
    }

    // Method to get the title of the current webpage
    async getTitle() {
        return await this.driver.getTitle();
    }

    // Getter method to locate and return the flight search button element using the selector imported from the selectors module
    get flightSearchButton() {
        return this.driver.findElement(By.css(selectors.flightSearchButton));
    }
}

module.exports = HomePage;
