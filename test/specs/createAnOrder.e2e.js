const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })

    it('should click Supportive Plan button', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const callATaxiButton = await $(page.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();

        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();

        // Debug log is optional since issue is resolved
        const isDisplayed = await supportivePlanButton.isDisplayed();
        console.log('Supportive Plan Button Displayed:', isDisplayed);

        if(isDisplayed) {
            await supportivePlanButton.click();
            await expect(supportivePlanButton).toBeDisplayed();
        } else {
            console.log('Supportive Plan Button is still not displayed.');
        }
    })
   
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.click();
       
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        const creditCardNumberField = await $(page.creditCardNumberField);
        await creditCardNumberField.waaitForDisplayed();
        await creditCardNumberField.setValue (123400004321);

        const cvvCodeField = await $(page.cvvCodeField);
        await cvvCodeField.setValue (12);

        const linkButton = await $(page.linkButton);
        await linkButton.click()

    })
   
    it('should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageField = await $(page.messageField);
        await messageField.setValue ('get some tequila');
        await expect(messageField).toBeExisting(),
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        //supportive button must be clicked
        await 
        await expect().toBeExisting(),
    })

    it('should order 2 icecreams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

    })

    it('The car search modal appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })
})

