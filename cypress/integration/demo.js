describe('Demo test', () => {

  it('should visit demo homepage ', () => {
    cy.visit('/', {onBeforeLoad: (win) => { win.sessionStorage.clear()}})
      .wait(3000)
      .reload(true);
  });

  it('should click submit button', () => {
    cy
      .get('#container-iframe')
      .then(($iframe) => {
        const $body = $iframe.contents().find('body');
        cy
          .wrap($body)
          .find('#submit')
          .click()
          .wait(3000);
      });
  });

  it('should check final page', () => {
    cy
      .url().should('include', 'alt.html')
      .end();
  });

});
