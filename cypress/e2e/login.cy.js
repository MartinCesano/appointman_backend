
describe('Register and Login flow', () => {
  const baseUrl = 'http://localhost:3001'; // Cambia por la URL donde corra tu backend
   
  it.skip('Registro', () => {
    cy.request('POST', `${baseUrl}/users/register`, {
      email: 'testing@gmail.com',
      password: 'password123',
      firstName: 'Login',
      lastName: 'Testing'
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it.skip('Login', () => {
    cy.request('POST', `${baseUrl}/users/login`, {
      email: 'testing@gmail.com',
      password: 'password123',
    }).then((response) => {
      expect(response.status).to.eq(201); // Suponiendo que el login es exitoso y devuelve un 200
      expect(response.body).to.have.property('accessToken');
      expect(response.body).to.have.property('refreshToken');
    });
  });

});