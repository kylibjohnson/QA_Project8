# Sprint 8 Project
## Project Name
Urban Routes : Ordering a Taxi | Kyli B. Johnson
## Project Description
The purpose of these tests are to check the functionality of Urban Routes by writing automated tests covering the full process of ordering a taxi. The tests interact with inputs, buttons, and wait functions using different types of locators and modules.
## Technologies & Techniques 
To begin, WebdriverIO was installed to the GitBash terminal and the project 8 repository was cloned from Github. Using Devtools and locators to help write automated tests for the user scenario of ordering a taxi on the Urban.Routes Platform. The code was written and tested in Visual Studio Code using Firefox and Chrome browsers. The code for the automated tests are then pushed to GitHub.

## Tests [& instructions]
The user scenario of ordering the taxi is covered Used at least 4 different types of locators .Tests interact with inputs & buttons. Wait functions are used correctly.

Under the helper.js file, the following code for the module should be inputed.
   
    module.exports = {
        getPhoneNumber: function(countryCode) {
            const number = Math.floor(1000000000 + Math.random() * 9000000000)
            return `${countryCode}${number}`
        },
        getElementByText: async function(obj) {
            return await $(`div=${obj.toString()}`);
        }
    };

Under the page.js file the folowing code for the modules should be inputed.

    module.exports = {
        // Inputs
        fromField: '#from',
        toField: '#to',
        phoneNumberField: '#phone',
        codeField: '#code',
        messageField: '#comment',

    // Buttons
    callATaxiButton: 'button= Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton:'div= Supportive', // div.tcard.active or tcard-title
    paymentMethodButton:'.pp-value-arrow',
    creditCardNumberField: '#number', 
    addCardButton: 'div=Add card',
    cvvCodeField: '.card-second-row #code', 
    linkButton: 'button=Link', 
    orderBlanketButton: 'div= Blanket and handkerch', // div= Blanket and handkerchiefs span.slider.round

    // Modals
    phoneNumberModal: '.modal',
    
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};

Add the command [the updated URL] to run tests to baseUrl in the wdio.config.js file.
Using the describe and it functions to create a set of tests under the createAnOrder.e2e.js file in the test\specs folder of the hm08-qa-us repository. The following code template is used.

    const page = require('../../page');
    const helper = require('../../helper')

    describe('Create an order', () => {
        it('[Each Test Case]', async () => {
            await browser.url(`/`)  
        })
    })

// Setting the address
// Selecting Supportive plan
// Filling in the phone number
// Adding a credit card (Tip: the “link” button doesn’t become active until the card CVV field on the “Adding a card” modal id=”code” class=”card-input” loses focus. To change focus you can simulate the user pressing TAB or clicking somewhere else on the screen).
// Writing a message for the driver
// Ordering a Blanket and handkerchiefs (Tip: there are two selectors to be aware of here. One selector to click on and one to run expect on to verify that the state changed).
// Ordering 2 Ice creams
// The car search modal appears
//TRICKY OPTIONAL: Waiting for the driver info to appear in the modal. 
// The driver search modal will appear and there will be a countdown while a driver is assigned. The modal will change from showing the car search to the drive info, as shown below: