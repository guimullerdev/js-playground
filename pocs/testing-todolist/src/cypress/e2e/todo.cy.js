describe('Todo List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('starts with zero items left', () => {
    cy.contains('0 item(s) left');
  });

  it('adds a new todo', () => {
    cy.get('#todo-input').type('Buy milk');
    cy.contains('button', 'Add').click();

    cy.contains('Buy milk').should('be.visible');
    cy.contains('1 item(s) left');
  });

  it('does not add an empty todo', () => {
    cy.contains('button', 'Add').click();
    cy.get('li').should('not.exist');
  });

  it('toggles a todo as done', () => {
    cy.get('#todo-input').type('Buy milk');
    cy.contains('button', 'Add').click();

    cy.get('input[type=checkbox]').check();
    cy.contains('0 item(s) left');
  });

  it('deletes a todo', () => {
    cy.get('#todo-input').type('Buy milk');
    cy.contains('button', 'Add').click();

    cy.get('button[aria-label="Delete Buy milk"]').click();
    cy.contains('Buy milk').should('not.exist');
  });
});
