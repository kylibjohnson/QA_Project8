# Sprint 8 Project
## Project Name
Urban Routes : Ordering a Taxi | Kyli B. Johnson
## Project Description
The purpose of these tests are to check the functionality of Urban Routes by writing automated tests covering the full process or ordering a taxi. The tests interact with inputs, buttons, and wait functions using different types of locators and modules.
## Technologies & Techniques 
GitBash | VS Code | GitHub | Urban.Routes Platform | FireFox | Chrome

## Tests [& instructions]
The user scenario of ordering the taxi is covered Used at least 4 different types of locators 
Tests interact with inputs 
Tests interact with buttons 
Wait functions are used correctly 
The command to run tests has been added to baseUrl from wdio.config.js is used in tests
// Setting the address
// Selecting Supportive plan
// Filling in the phone number
// Adding a credit card (Tip: the “link” button doesn’t become active until the card CVV field on the “Adding a card” modal id=”code” class=”card-input” loses focus. To change focus you can simulate the user pressing TAB or clicking somewhere else on the screen).
// Writing a message for the driver
// Ordering a Blanket and handkerchiefs (Tip: there are two selectors to be aware of here. One selector to click on and one to run expect on to verify that the state changed).
// Ordering 2 Ice creams
// The car search modal appears
// Waiting for the driver info to appear in the modal (optional) In addition to the steps above there is an optional step you can check. This one is a bit more tricky than the others but it’s good practice since you will likely encounter more difficult tasks in your career.
// The driver search modal will appear and there will be a countdown while a driver is assigned. The modal will change from showing the car search to the drive info, as shown below: