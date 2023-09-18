// Importing necessary libraries and modules
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

// Importing selector resources and page object classes
const selectors = require('./Resources/Selectors.js');
const HomePage = require('./pageObjects/HomePage.js');  // Import the HomePage class
const ChooseFlightPage = require('./pageObjects/ChooseFlightPage.js');
const SeatPicker = require('./pageObjects/SeatPicker.js');

// Importing test flow methods and utilities
const LoadHomePageTest = require('./utils/FlowMethods.js');
const Utils = require('./utils/utils.js');

// Importing individual test cases
const HomePageTesting = require('./Tests/homepageTest.js');
const CheckDetailsTest = require('./Tests/checkDetailsTest.js');
const FlightPick = require('./Tests/flightPickTest.js');
const SkipLogin = require('./Tests/skipLoginTest.js');
const EnterPassengersName = require('./Tests/enterPassengersName.js');
const DepartSeat = require('./Tests/departSeatTest.js');
const ReturnSeat = require('./Tests/returnSeatTest.js');

// Importing Chrome driver for Selenium
const chrome = require('selenium-webdriver/chrome');

// Setting Chrome options to avoid potential issues in certain environments
let options = new chrome.Options();
options.addArguments('--disable-gpu');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

// Main test suite
describe('Ryanair Home Page Loading Test', function () {
    this.timeout(50000);  // Setting timeout to 50 seconds to avoid prematurely exiting the tests

    // Declaring variables to hold instances of the imported classes
    let driver;
    let homePage;
    let flightselect;
    let seatPick;
    let test;
    let utils;
    let homePageTesting;
    let checkDetailsTest;
    let flightPick;
    let skipLogin;
    let enterPassengersName;
    let departSeat;
    let returnSeat;

    // Retrieving Selenium host and port from environment variables, with defaults set to 'localhost' and 4444
    const seleniumHost = process.env.SELENIUM_HOST || 'localhost';
    const seleniumPort = process.env.SELENIUM_PORT || 4444;

    // Hook to set up the testing environment before running the tests
    before(async () => {
        // Initializing the WebDriver with the specified Chrome options
        driver = await new Builder()
            .forBrowser('chrome')
            // Un-comment to use for Docker Use
            // .usingServer(`http://${seleniumHost}:${seleniumPort}/wd/hub`)  // Configuring the WebDriver to use the Selenium server
            .setChromeOptions(options)
            .build();

        // Creating new instances of the page object classes
        homePage = new HomePage(driver);
        flightselect = new ChooseFlightPage(driver);
        seatPick = new SeatPicker(driver);
        test = new LoadHomePageTest(driver);
        utils = new Utils(driver);
        homePageTesting = new HomePageTesting(driver);
        checkDetailsTest = new CheckDetailsTest(driver);
        flightPick = new FlightPick(driver);
        skipLogin = new SkipLogin(driver);
        enterPassengersName = new EnterPassengersName(driver);
        departSeat = new DepartSeat(driver);
        returnSeat = new ReturnSeat(driver);

        // Opening the Ryanair homepage and handling initial popups and cookies
        await homePage.open();
        await homePage.acceptCookies();
        await homePage.closePopup();
    });

    // Hook to clean up the testing environment after running the tests
    after(async () => {
        setTimeout(async () => {
            await driver.quit();
        }, 30000); // Keeps the browser open for 30 seconds before quitting
    });

    // Individual test cases
    it('Run homepage tests', async function () {
        await homePageTesting.runTests(); // Running homepage tests
    });

    it('Run check details test', async function () {
        await checkDetailsTest.runTests(); // Running check details tests
    });

    it('Run flight pick tests', async function () {
        await flightPick.runTests(); // Running flight pick tests
    });

    it('Run skip login', async () => {
        await skipLogin.runTests(); // Running skip login tests
    });

    it('Run Passengers Names Entered ok and Made it to Seat Picker', async () => {
        await enterPassengersName.runTests(); // Running passenger name entry tests
    });

    it('Run Randomly select an available seat First Page', async () => {
        await departSeat.runTests(); // Running departure seat selection tests
    });

    it('Run Randomly select an available seat Return Second Page', async () => {
        await returnSeat.runTests(); // Running return seat selection tests
    });
});
