
describe('Register and Login flow', () => {
  const baseUrl = 'http://localhost:3000'; // Cambia por la URL donde corra tu backend

  it('Registro', () => {
    cy.request('POST', `${baseUrl}/users/register`, {
      email: 'testing@gmail.com',
      password: 'password123',
      firstName: 'Login',
      lastName: 'Testing'
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  //register con datos en formato incorrecto
  it('Registro incorrecto', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users/register`,
      body: {
        email: 'dosarrobas@@gmail.com',
        password: 'corta',
        firstName: '',
        lastName: ''
      },
      failOnStatusCode: false // Evita que Cypress falle automáticamente en códigos de estado 4xx y 5xx
    }).then((response) => {
      expect(response.status).to.eq(400); // Verifica que el código de estado sea 400
      expect(response.body).to.have.property('message').and.to.include.members([
        'Email is invalid',
        'Password must be at least 6 characters long',
        'First name is required',
        'Last name is required'
      ]); // Verifica que el mensaje de error contenga los mensajes esperados
    });
  });

  it('Login', () => {
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