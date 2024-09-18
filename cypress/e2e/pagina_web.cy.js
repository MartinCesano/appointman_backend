
describe('Pagina web', function() {
    it('Visitar página web', function() {
        cy.visit('https://4h5h7v02-4200.brs.devtunnels.ms/') // URL de la página web
        cy.get('.email')
        .type('martingaido@gmail.com')
        cy.get('.password')
        .type('12345678(enter)')
    })    
    
})