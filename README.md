# Sprint 8 Project
## Project Name
Urban Routes : Ordering a Taxi | Kyli B. Johnson
## Project Description
The purpose of these tests are to check the functionality of Urban Routes by writing automated tests covering the full process of ordering a taxi. The tests interact with inputs, buttons, and wait functions using different types of locators and modules.
## Technologies & Techniques 
To begin, WebdriverIO was installed to the GitBash terminal and the project 8 repository was cloned from Github. Using Devtools and locators to help write automated tests for the user scenario of ordering a taxi on the Urban.Routes Platform. The code was written and tested in Visual Studio Code using Firefox and Chrome browsers. The code for the automated tests are then pushed to GitHub.

'Headless Mode' was used to continue working while tests were ran in the background. This feature was applied under the chrome and firefox capabilities in the wdio.conf.js file.
 

## Test Pre-Conditions [& instructions]
The user scenario of ordering the taxi is covered by using at least 4 different types of locators. Tests interact with inputs & buttons while wait functions are used correctly. 

Add the command [the updated URL] to run tests to baseUrl in the wdio.config.js file.

To use the modules created in the page.js and helper.js file the following code is inserted at the begininng of the createAnOrder.e2e.js file

        const page = require('../../page');
        const helper = require('../../helper')

A set of tests using the describe and it functions are under the createAnOrder.e2e.js file located in the test\specs folder of the hm08-qa-us repository. The following test cases are as follows
1. Setting the address
2. Selecting Supportive plan option
3. Filling in the phone number. This is comprised of two tests. First, making sure the phone number modal opens and the second saves the phone number
4. Adding a credit card. The “link” button doesn’t become active until the card CVV field on the “Adding a card” modal loses focus. To change focus the user pressing TAB is simulated.
5. Writing a message for the driver
6. Ordering a Blanket and handkerchiefs. There are two selectors here. One selector to click on and one to run expect on to verify that the state changed.
7.  Ordering 2 Ice creams
8. The car search modal appears
9. Waiting for the driver info to appear in the modal.
The driver search modal will appear and there will be a countdown while a driver is assigned. The modal will change from showing the car search to the drive info. In order to wait for the countdown, the functions isExisting and isDisplayed must be used with the locator for the driver information ('.order-button') saved in the page.js file.

After all codes have been inserted and the URL is updated, the tests can be ran in Visual Studio by running the command 'npm run wdio'.
 