
describe('Pagina web', function() {
    it('Visitar página web', function() {
        cy.visit('localhost:4200') // URL de la página web
        cy.get('.email')
        .type('martingaido@gmail.com')
        cy.get('.password')
        .type('12345678(enter)')
    })    
    
})