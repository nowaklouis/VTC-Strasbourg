describe('Testing form functionnality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should be able to write text in the input', () => {
    cy.get('[data-cy="departure-input"]')
      .click()
      .type('23 rue de la haye')
      .invoke('val')
      .should('equal', '23 rue de la haye');
  });
  it('should be able to chose number of passengers', () => {
    cy.get('#passagers').parent().click();
    cy.get('[data-cy="passengers-2"]').click();
    cy.get('#passagers').should('contain', '2');
  });
  it('should be able to geolocalize', () => {
    cy.visit('http://localhost:3000/', {
      onBeforeLoad(win) {
        // e.g., force Barcelona geolocation
        const latitude = 41.38879;
        const longitude = 2.15899;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { latitude, longitude } });
        });
      },
    });
    cy.get('[data-cy="geoloc-btn"]').click();
    cy.get('[data-cy="departure-input"]').invoke('val').should('contain', 'Barcelona');
  });
});
