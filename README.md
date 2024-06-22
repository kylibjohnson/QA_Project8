# Sprint 8 Project
## Project Name
Urban Routes : Ordering a Taxi | Kyli B. Johnson
## Project Description
The purpose of these tests are to check the functionality of Urban Routes by writing automated tests covering the full process of ordering a taxi. The tests interact with inputs, buttons, and wait functions using different types of locators and modules.
## Technologies & Techniques 
To begin, WebdriverIO was installed to the GitBash terminal and the project 8 repository was cloned from Github. Using Devtools and locators to help write automated tests for the user scenario of ordering a taxi on the Urban.Routes Platform. The code was written and tested in Visual Studio Code using Firefox and Chrome browsers. The code for the automated tests are then pushed to GitHub.

'Headless Mode' was used to continue working while tests were ran in the background. To apply this feature, go to the wdio.conf.js file. Under the chrome capabilities insert the following code.
    'goog:chromeOptions': {
            args: ['headless', 'disable-gpu']
        }
Insert the following code to enable headless mode for firefox.
    'moz:firefoxOptions': {
            args: ['-headless']
        }

## Test Pre-Conditions [& instructions]
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

   

Add the command [the updated URL] to run tests to baseUrl in the wdio.config.js file.
Using the describe and it functions to create a set of tests under the createAnOrder.e2e.js file in the test\specs folder of the hm08-qa-us repository. 

The following template is used at the begininng of the code in the createAnOrder.e2e.js file.

    const page = require('../../page');
    const helper = require('../../helper')

    describe('Create an order', () => {
        it('[Each Test Case]', async () => {
            await browser.url(`/`)  
        })
    })

## Tests 
The user scenario of ordering the taxi is covered by using at least 4 different types of locators. Tests interact with inputs & buttons while wait functions are used correctly. The code snippet for each test case is as follows

1. Setting the address
    
    it('should set the address', async () => {
        await browser.url(`/`)
        const fromField = $('#from');
        fromField.setValue('East 2nd Street, 601');
            const toField = await $('#to')
        await toField.setValue('1300 1st St')
        await browser.pause(10000);
        
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed({ timeout: 20000 });
        await callATaxiButton.click();
    })

2. Selecting Supportive plan
    
    it('should click Supportive Plan button', async () => {
        await browser.url(`/`);
        const fromField = $('#from');
        fromField.setValue('East 2nd Street, 601');
            const toField = await $('#to')
        await toField.setValue('1300 1st St')
        await browser.pause(10000);
        
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed({ timeout: 20000 });
        await callATaxiButton.click();

        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    })

3. Filling in the phone number. This is comprised of two tests. First, making sure the phone number modal opens and the second saves the phone number

        it('should open phone number modal', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.selectSupportive();
            const phoneNumberButton = await $(page.phoneNumberButton);
            await phoneNumberButton.waitForDisplayed();
            await phoneNumberButton.click();
            const pnoneNumberModal = await $(page.phoneNumberModal);
            await expect(pnoneNumberModal).toBeExisting();
        })

        it('should save the phone', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.selectSupportive();
            const phoneNumber = helper.getPhoneNumber("+1");
            await page.submitPhoneNumber(phoneNumber);
            await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        })

4. Adding a credit card (The “link” button doesn’t become active until the card CVV field on the “Adding a card” modal id=”code” class=”card-input” loses focus. To change focus you can simulate the user pressing TAB or clicking somewhere else on the screen).

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();

        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
       
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        const creditCardNumberField = await $(page.creditCardNumberField);
        await creditCardNumberField.waitForDisplayed();
        await creditCardNumberField.setValue (123400004321);

        const cvvCodeField = await $(page.cvvCodeField);
        await cvvCodeField.setValue (12);

        const linkButton = await $(page.linkButton);
        await linkButton.click()
    })

5. Writing a message for the driver

    it('should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        
        const messageField = await $(page.messageField);
        await messageField.setValue ('get some tequila');
        await expect(messageField).toBeExisting();
    })

6. Ordering a Blanket and handkerchiefs (There are two selectors to be aware of here. One selector to click on and one to run expect on to verify that the state changed).

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const orderBlanketButton = await $(page.orderBlanketButton);
        await orderBlanketButton.waitForDisplayed();
        await orderBlanketButton.click();
        await expect($(page.blanketSwitch)).toBeChecked();
    })

7.  Ordering 2 Ice creams

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const orderIceCreamButton = await $(page.orderIceCreamButton);
         // Increment the counter twice
              await orderIceCreamButton.click();
              await orderIceCreamButton.click();
              await browser.pause(500); 

         const iceCreamCount = await $(page.iceCreamCount).getText();
         expect(iceCreamCount).toEqual('2'); 
    })

8. The car search modal appears

    it('should open the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await page.fillCardNumber('123400004321');
        await page.fillCvvNumber('12');
        await browser.pause(1000);
        
        //Ensuring the Payment Modal Exists
        const paymentModal = await $(page.cardPaymentModal);
        const modalExists = await paymentModal.waitForExist({ timeout: 15000 });
        if (!modalExists) {
            throw new Error('Payment modal does not exist');
        }
        const modalDisplayed = await paymentModal.waitForDisplayed({ timeout: 15000 });
        if (!modalDisplayed) {
            throw new Error('Payment modal is not displayed');
        }
        await browser.pause(1000); 

        // Identify the close button within the active section
        const closeButtonSection = await paymentModal.$('.section.active');
        const closeButton = await closeButtonSection.$('.close-button.section-close');
        const buttonExists = await closeButton.waitForExist({ timeout: 15000 });
        if (!buttonExists) {
            throw new Error('Close button does not exist');
        }
        const buttonDisplayed = await closeButton.waitForDisplayed({ timeout: 15000 });
        if (!buttonDisplayed) {
            throw new Error('Close button is not displayed');
        }
        await closeButton.click();
        await browser.pause(1000);
       
        const orderButton = await $(page.orderButton);
        await orderButton.waitForClickable({ timeout: 15000 });
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    }) 

9. OPTIONAL: Waiting for the driver info to appear in the modal. 
// The driver search modal will appear and there will be a countdown while a driver is assigned. The modal will change from showing the car search to the drive info