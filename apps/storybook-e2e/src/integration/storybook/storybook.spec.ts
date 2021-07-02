describe('storybook: Storybook component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=storybook--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to storybook!');
    });
});
