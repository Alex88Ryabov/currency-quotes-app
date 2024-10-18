describe('Quote Table Load Test', () => {
  it('should update quotes in the table', () => {
    cy.visit('http://localhost:4200'); // URL вашего приложения

    // Проверяем, что таблица видима
    cy.get('table').should('be.visible');

    // Убедимся, что у нас есть хотя бы одна строка
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Ждем, чтобы получить начальные значения
    cy.wait(10000); // Ждем 2 секунды для первоначальной загрузки

    // Проверяем, что таблица все еще реагирует
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Сохраняем начальные значения для последующей проверки
    let initialBid, initialAsk, initialTime;

    // Получаем первую строку и сохраняем ее значения
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(2).invoke('text').then((text) => {
        initialBid = text.trim();
      });
      cy.get('td').eq(3).invoke('text').then((text) => {
        initialAsk = text.trim();
      });
      cy.get('td').eq(0).invoke('text').then((text) => {
        initialTime = text.trim();
      });
    });

    // Ждем обновления данных
    cy.wait(5000); // Ждем 5 секунд для обновления данных

    // Снова проверяем, что таблица все еще реагирует
    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    // Проверяем, что значения обновились
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(2).should('not.equal', initialBid); // Проверяем, что Bid изменился
      cy.get('td').eq(3).should('not.equal', initialAsk); // Проверяем, что Ask изменился
      cy.get('td').eq(0).should('not.equal', initialTime); // Проверяем, что время изменилось
    });
  });
});
