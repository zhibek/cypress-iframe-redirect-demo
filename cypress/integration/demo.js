describe('Demo test', () => {

  const getIframeWindow = () => {
    return cy
      .get('iframe[id="container-iframe"]')
      .its('0.contentWindow').should('exist')
  }

  it('should visit demo homepage ', () => {
    cy.visit('/', {onBeforeLoad: (win) => { win.sessionStorage.clear()}})
      .wait(3000)
      .reload(true);
  });

  it('should fix iframe redirect', () => {
    getIframeWindow().then((win) => {
      win.document.getElementById('debug').innerHTML = '** Redirect "fixed"!';
      win.targetWindow = win.parent.window;
      win.destination = './alt.html';
    });
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
