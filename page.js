module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardNumberField: '#number.card-input',
    cvvCodeField: '.card-second-row #code',
    messageField: '#comment.input',
    iceCreamCount: '.counter-value',

    // Buttons
    callATaxiButton: '//button[contains(text(), "Call a taxi")]',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]', //<div class="np-text">Phone number</div>
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton:'div=Supportive', // div.tcard.active or tcard-title
    paymentMethodButton:'.pp-value-arrow', 
    addCardButton: 'div=Add card', 
    linkButton: 'button=Link', 
    closeButton: 'button.close-button.section-close', // '//button[contains(text(), "close-button section-close")]'
    orderBlanketButton: '.r-sw',
    blanketSwitch: '.switch-input', 
    orderIceCreamButton: '.counter-plus', // $('//div[contains(text(),"Ice cream")]/following-sibling::div[contains(@class, "counter-value")]/parent::div')
    orderButton :'span.smart-button-main',

    // Modals
    phoneNumberModal: '.modal',
    cardPaymentModal: '.payment-picker.open',
    carSearchModal: '.order-body',
    driverInfo: '',
    
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
    selectSupportive: async function(selectSupportive) {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
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
    async fillCardNumber(number) {
        console.log("Initiating fillCardNumber...");
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        await browser.pause(500); // slight pause for actions to sync
        // Click the Add Card Button
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        await browser.pause(500); // slight pause for actions to sync
        // Enter Credit Card Number
        const creditCardNumberField = await $(this.creditCardNumberField);
        await creditCardNumberField.waitForDisplayed();
        await creditCardNumberField.setValue(number.toString());
        console.log("Completed fillCardNumber...");
    },
    async fillCvvNumber(code) {
        console.log("Initiating fillCvvNumber...");
        const cvvCodeField = await $(this.cvvCodeField);
        await cvvCodeField.setValue(code);
        await browser.keys('Tab');
        await browser.pause(500); // slight pause for actions to sync
        // Click Link Button
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
        await browser.pause(1000);
        console.log("Completed fillCvvNumber...");
    },
};