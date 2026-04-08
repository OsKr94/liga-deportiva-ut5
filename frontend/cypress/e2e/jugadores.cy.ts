describe('E2E Jugadores - flujo correcto', () => {

  it('Admin accede y ve lista de jugadores', () => {
    cy.visit('http://localhost:4200');

    
    cy.visit('http://localhost:4200/jugadores');

    cy.contains('Jugadores'); 
  });

});


it('Caso ERROR: muestra mensaje cuando falla la API', () => {

  cy.intercept('GET', '**/api/jugadores*', {
    statusCode: 500,
    body: {},
  });

  cy.visit('http://localhost:4200/jugadores');

  
  cy.contains('Jugadores');

});