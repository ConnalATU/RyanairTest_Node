const assert = require('assert');
const LoadHomePageTest = require('../utils/FlowMethods.js');  

class CheckDetailsTest {
    constructor(driver) {
        this.driver = driver;
        this.loadHomePageTest = new LoadHomePageTest(driver);  
    }

    /**
     * Run a series of assertions to verify the correctness of the details on the page.
     * Leveraging the run2 method from the LoadHomePageTest class to get the details to assert on.
     */
    async runTests() {
        const result = await this.loadHomePageTest.run2();  
        console.log('Test results:', result);

        // Validate that the displayed details match the expected values
        assert(result.displayedDepartureAirport.includes('Dublin'), 'Displayed departure airport does not match the expected value');
        assert(result.displayedArrivalAirport.includes('Barcelona'), 'Displayed arrival airport does not match the expected value');
        assert(result.displayedDepartureDate.includes('18 Nov'), 'Displayed departure date does not match the expected value');
        assert(result.displayedReturnDate.includes('25 Nov'), 'Displayed return date does not match the expected value');
        assert(result.displayedNumberOfPersons.includes('2'), 'Displayed number of persons does not match the expected value');
    }
}

module.exports = CheckDetailsTest;
