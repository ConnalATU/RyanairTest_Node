// Importing the necessary functionalities from the selenium-webdriver package
const { By, Key, until } = require('selenium-webdriver');

// Defining a class called LogInComponent
class LogInComponent {
    // The constructor takes a driver object as a parameter and initializes a new LogInComponent with it
    constructor(driver) {
        this.driver = driver;
    }

    // An asynchronous method called LoginClick which takes a boxSelector parameter to represent the CSS selector of the element to be interacted with
    async LoginClick(boxSelector) {
        try {
            // Wait until the element specified by boxSelector is located in the DOM; 5000 milliseconds is the timeout period after which it stops waiting
            const flight = await this.driver.wait(until.elementLocated(By.css(boxSelector)), 5000);
            
            // Wait until the located element is visible and enabled, meaning it can be interacted with; again, it waits up to 5000 milliseconds
            await this.driver.wait(until.elementIsVisible(flight), 5000);
            
            // Clicking on the located element to initiate some action (like skipping login)
            await flight.click();
            
            // After clicking the element, it waits for 5000 milliseconds to allow for any subsequent actions or loads to complete
            await this.driver.sleep(5000);
            
            // Log a message to the console indicating that the login has been skipped successfully
            console.log("Login Skipped.");
        } catch (error) {
            // If any error occurs during the above operations, it is caught here and logged to the console with a message
            console.log('Error in LoginClick method:', error);
        }
    }
}

// Exporting the LogInComponent class so it can be used in other files
module.exports = LogInComponent;



