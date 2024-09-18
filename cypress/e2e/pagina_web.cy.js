
describe('Pagina web', function() {
    it('Visitar página web', function() {
        cy.visit('http://localhost:4200/login') // URL de la página web
        cy.get('#email').type('martingaido00@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/home')
    });
    it('Visitar página web', function() {
       
        cy.intercept('POST', '/users/login').as('loginRequest')
        cy.visit('http://localhost:4200/login')
        cy.get('#email').type('martingaido@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('button[type="submit"]').click()
        cy.wait('@loginRequest').then((interception) => {expect(interception.response.statusCode).to.eq(401)
    })
})
})