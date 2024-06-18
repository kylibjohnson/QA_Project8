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
    callATaxiButton: 'button= Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]', //<div class="np-text">Phone number</div>
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton:'div= Supportive', // div.tcard.active or tcard-title
    paymentMethodButton:'.pp-value-arrow', 
    addCardButton: 'div=Add card', 
    linkButton: 'button=Link', 
    closeButton: 'button.close-button.section-close'
    orderBlanketSwitch: '.span.slider.round', // div= Blanket and handkerchiefs span.slider.round
    orderIceCreamButton: '.counter-plus', // $('//div[contains(text(),"Ice cream")]/following-sibling::div[contains(@class, "counter-value")]/parent::div')
    orderButton :'button.smart-button',

    // Modals
    phoneNumberModal: '.modal',
    cardPaymentModal: 'payment-picker.modal',
    carSearchModal: '',
    
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
    fillCardNumber: async function(cardNumber) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
       
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        const cardPaymentModal = await $(this.cardPaymentModal);
        await cardPaymentModal.waitForDisplayed();
        
        const creditCardNumberField = await $(this.creditCardNumberField);
        await creditCardNumberField.waitForDisplayed();
        await creditCardNumberField.setValue (cardNumber);

        const cvvCodeField = await $(this.cvvCodeField);
        await cvvCodeField.setValue (cvvCode);

        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click()

        const closeButton = await $(this.closeButton);
        await closeButton.waitForDisplayed();
        await closeButton.click();
    },
};