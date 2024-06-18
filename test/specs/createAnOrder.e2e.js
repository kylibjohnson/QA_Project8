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
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();

        // Debug log is optional
      //  const isDisplayed = await supportivePlanButton.isDisplayed();
      //  console.log('Supportive Plan Button Displayed:', isDisplayed);

     //   if(isDisplayed) {
     //       await supportivePlanButton.click();
     //       await expect(supportivePlanButton).toBeDisplayed();
     //   } else {
     //       console.log('Supportive Plan Button is still not displayed.');
      //  }
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
        await creditCardNumberField.setValue (123400004321);

        const cvvCodeField = await $(page.cvvCodeField);
        await cvvCodeField.setValue (12);

        const linkButton = await $(page.linkButton);
        await linkButton.click()

    })
   
    it('should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        
        const messageField = await $(page.messageField);
        await messageField.setValue ('get some tequila');
        await expect(messageField).toBeExisting(),
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const orderBlanketSwitch = await $(page.orderBlanketSwitch);
        await orderBlanketSwitch.waitForDisplayed();
        await orderBlanketSwitch.click();
        await browser.pause (1000);
        await expect(orderBlanketSwitch).toBeChecked(),
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

    it('The car search modal appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })
});



it("should display the car search modal", async () => {
    await browser.url("/");
    await page.fillAddresses('East 2nd Street, 601, "1368 1st St');
  
    // const phoneNumber = helper.getPhoneNumber("+1");
    // await page.submitPhoneNumber(phoneNumber);
    // phoneNumber.setValue("573 823 3269");
    const orderButton = await $(page.orderButton);
    // await orderButton.toBeExisting();
    await orderButton.click();
    const carSearchModal = await $(page.carSearchModal);
    await expect(carSearchModal).toBeExisting();
});

