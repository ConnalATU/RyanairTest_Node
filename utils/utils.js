// Importing necessary modules from Selenium WebDriver and the assert module for assertions
const { By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Defining the Utils class which contains utility methods for the tests
class Utils {
    // Constructor accepting a driver parameter to interact with the browser
    constructor(driver) {
        this.driver = driver;
    }

    // Method to confirm the presence and visibility of a specific element on the page
    async conFirmElementOnPage(selector){
        try {
            // Waiting for the element to be located on the page with a timeout of 10 seconds
            const PageElement = await this.driver.wait(until.elementLocated(By.xpath(selector)), 10000);
            
            // Waiting for the element to be visible on the page with a timeout of 10 seconds
            await this.driver.wait(until.elementIsVisible(PageElement), 10000);
            
            // Asserting that the element is displayed on the page
            assert.ok(await PageElement.isDisplayed(), `Element with selector "${selector}" not displayed on the page`);
        } catch (error) {
            // Logging any error encountered and failing the test with a relevant error message
            console.error('Error in conFirmElementOnPage:', error);
            assert.fail(`Failed to confirm element with selector "${selector}" on the page`);
        }
    }

    // Method to verify the flow involving the login menu and passengers form
    async flightFlow(loginMenuSelector, passengersFormSelector){
        // Locating the login component and asserting its visibility
        const loginComp = await this.driver.wait(until.elementLocated(By.xpath(loginMenuSelector)), 10000);
        console.log('Login component located');
        assert.ok(await loginComp.isDisplayed(), 'The login component is not visible on the page');

        // Locating the passengers section and asserting its visibility
        const passengersSectionLocate = await this.driver.wait(until.elementLocated(By.xpath(passengersFormSelector)), 10000);
        console.log('Passengers section located');
        assert.ok(await passengersSectionLocate.isDisplayed(), 'The "Passengers" section is not visible on the page');

        try {
            // Waiting for the "Passengers" section to be present in the DOM, identifying it by its CSS class
            const passengersSection = await this.driver.wait(until.elementLocated(By.css('.form-wrapper--disabled')), 10000);

            // Checking the visibility of the "Passengers" section
            const isDisplayed = await passengersSection.isDisplayed();

            // Asserting the disabled state of the "Passengers" section based on its visibility and the presence of a specific CSS class
            if (isDisplayed) {
                console.log('The "Passengers" section is disabled');
                assert.ok(true, 'The "Passengers" section is disabled');
            } else {
                console.log('The "Passengers" can be seen');
                assert.fail('The "Passengers" can be seen');
            }
        } catch (error) {
            // Logging any error encountered and failing the test with a relevant error message
            console.log('Error:', error);
            console.log('The "Passengers" section is not found or does not have the disabled class');
            assert.fail('The "Passengers" section is not correctly disabled');
        }
    }
}

// Exporting the Utils class to make it available for other modules
module.exports = Utils;
