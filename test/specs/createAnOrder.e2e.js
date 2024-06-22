const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
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
        await creditCardNumberField.setValue(123400004321);
    
        const cvvCodeField = await $(page.cvvCodeField);
        await cvvCodeField.setValue(12);
        await browser.keys('Tab');
    
        const linkButton = await $(page.linkButton);
        await linkButton.click()
    })
    
    it('should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        
        const messageField = await $(page.messageField);
        await messageField.setValue ('get some tequila');
        await expect(messageField).toBeExisting();
    })
    
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
    
        const orderBlanketButton = await $(page.orderBlanketButton);
        await orderBlanketButton.waitForDisplayed();
        await orderBlanketButton.click();
        await expect($(page.blanketSwitch)).toBeChecked();
    })
    
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
    it('should open the car search modal', async () => {
        await browser.url(`/`);
  
        console.log('Filling addresses...');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();

        const phoneNumber = helper.getPhoneNumber('+1');
        console.log('Submitting phone number...');
        await page.submitPhoneNumber(phoneNumber);

        console.log('Filling card number...');
        await page.fillCardNumber('123400004321');
        console.log('Filling CVV number...');
        await page.fillCvvNumber('12');
        // Add a slight wait to ensure inputs are processed
        await browser.pause(1000);
        // Ensure the payment modal is present and displayed
        const paymentModal = await $(page.cardPaymentModal);
        console.log('Waiting for the payment modal to exist...');
        const modalExists = await paymentModal.waitForExist({ timeout: 15000 });
        if (!modalExists) {
            throw new Error('Payment modal does not exist');
        }

        console.log('Waiting for the payment modal to display...');
        const modalDisplayed = await paymentModal.waitForDisplayed({ timeout: 15000 });
        if (!modalDisplayed) {
            throw new Error('Payment modal is not displayed');
        }
        // Add a short pause to ensure the modal is fully interactive
        await browser.pause(1000); 
        // Identify the close button within the active section
        console.log('Attempting to find the close button...');
        const closeButtonSection = await paymentModal.$('.section.active');
        const closeButton = await closeButtonSection.$('.close-button.section-close');
        console.log('Waiting for the close button to exist...');
        const buttonExists = await closeButton.waitForExist({ timeout: 15000 });
        if (!buttonExists) {
            throw new Error('Close button does not exist');
        }
        console.log('Waiting for the close button to display...');
        const buttonDisplayed = await closeButton.waitForDisplayed({ timeout: 15000 });
        if (!buttonDisplayed) {
            throw new Error('Close button is not displayed');
        }
        console.log('Clicking the close button...');
        await closeButton.click();
        // Add a brief wait to ensure the action is complete
        await browser.pause(1000);
       
        const orderButton = await $(page.orderButton);
        console.log('Waiting for the order button to be clickable...');
        await orderButton.waitForClickable({ timeout: 15000 });
        await orderButton.click();

        const carSearchModal = await $(page.carSearchModal);
        console.log('Verifying car search modal exists...');
        await expect(carSearchModal).toBeExisting();
    })

    it("should display driver info", async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive ();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await page.fillCardNumber('123400004321');
        await page.fillCvvNumber('12');
        await page.submitPaymentOrder();
        
        const driverInfo = await $(page.driverInfo);
        await expect(driverInfo.isExisting()).toBeTruthy();
        await expect(driverInfo.isDisplayed()).toBeTruthy();
    })
});
