beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{

        checkPasswordDiff('test1', 'test2')

    })
    
    it('User can submit form with all fields added', ()=>{

        inputAllValidData('simulant')

    })
    it('User can submit form with valid data and only mandatory fields added', ()=>{

        inputValidData('simulant')
        cy.get('.submit_button').should('not.be.disabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').should('contain.text', 'User successfully')

    })

    it('User cant submit with missing username', ()=>{
        inputValidData('simulant')
        cy.get('input[data-testid="user"]').scrollIntoView()
        cy.get('input[data-testid="user"]').clear()
        cy.get('h2').contains('Password').click() 
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain.text', 'Mandatory input field is not valid or empty!')
})

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('My test for second picture', () => {

        cy.log('Will check logo source and size of logo2')
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 115)
            .and('be.greaterThan', 85)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 

    it('Check navigation part2', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that animal dropdown has correct values', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
})


    it('Car dropdown is correct', () => {

        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    // Create test similar to previous one

    it('Car dropdown is correct - my test', () => {
        cy.get('#cars').select(0).screenshot('Cars drop-down2')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
})

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}

function inputAllValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
    cy.get('#cssFavLanguage').check()
    cy.get('#vehicle1').check()
    cy.get('#vehicle2').check()
    cy.get('#vehicle3').check()
    cy.get('select[name="cars"]').select("volvo")
    cy.get('select[name="animal"]').select("cat")
    cy.get('.submit_button').should('not.be.disabled')
    cy.get('.submit_button').click()
    cy.get('#success_message').should('be.visible').should('contain.text', 'User successfully submitted registration')
}

function checkPasswordDiff(password1, password2) {
    cy.get('#username').type('simulant')
    cy.get('#email').type('simulant@simul.ee')
    cy.get('input[name="name"]').type('Simul')
    cy.get('input[name="lastName"]').type('Ant')
    cy.get('input[data-testid="phoneNumberTestId"]').type('556644')


    cy.get('#password').type(password1)
    cy.get('#confirm').type(password2)
    cy.get('h2').contains('Password').click() 
    cy.get('.submit_button').should('be.disabled')
    cy.get('#success_message').should('not.be.visible')
    cy.get('#password_error_message').should('be.visible').should('contain.text', 'Passwords do not match!')

    passwordChanger(password1)
}

function passwordChanger(firstpw){
    cy.get('#confirm').scrollIntoView()
    cy.get('#confirm').clear()
    cy.get('#confirm').type(firstpw)
    cy.get('h2').contains('Password').click()
    cy.get('#password_error_message').should('not.be.visible')
    cy.get('.submit_button').should('be.enabled')
}