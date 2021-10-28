/// <reference types="cypress" />
// npm rum cypress

describe("SUIT de Teste: testando as funcionalidades do site anydice.com", () => {
  // 1
  it("Cenário de Teste: Rolando 1d20 e Somando 5", () => {
    cy.visit("https://anydice.com/");
    cy.get("#codeInput").clear().type("output 1d20 + 5");
    cy.get("#calculateButton").click();
    cy.wait(1000);
    cy.get(":nth-child(15) > :nth-child(2)").should("contain.text", "5.00");
  });

  // 2
  it("Cenário de Teste: Acessando a Documentação", () => {
    cy.visit("https://anydice.com/");
    cy.get("#documentationPage-selector").click();
    cy.get("#documentationPage > :nth-child(2)").click();
    cy.wait(1000);
    cy.scrollTo("bottom");
    cy.get("#documentationPage > :nth-child(20)").should(
      "contain.text",
      "Functions"
    );
  });

  // 3
  it("Cenário de Teste: Gerando Erro de Sintaxe", () => {
    cy.visit("https://anydice.com/");
    cy.get("#codeInput")
      .clear()
      .type(`output 1d20 as "ataque de espada longa"`);
    cy.get("#calculateButton").click();
    cy.wait(1000);
    cy.get("#errorDisplay > h3").should("contain.text", "syntax error");
  });

  // 4
  it("Cenário de Teste: Usando Funções", () => {
    cy.visit("https://anydice.com/");
    cy.get("#codeInput").clear().type(testFunction);
    cy.get("#calculateButton").click();
    cy.wait(1000);
    cy.get(":nth-child(10) > caption").should("contain.text", "10d");
  });

  // 5
  it("Cenário de Teste: Rolando Dados Arbitrários", () => {
    cy.visit("https://anydice.com/");
    cy.get("#codeInput").clear().type(`output d{{}-1..1} named "Fudge die"`);
    cy.get("#calculateButton").click();
    cy.wait(1000);
    cy.get("caption").should("contain.text", "Fudge die");
  });

  // 6
  it("Cenário de Teste: Checando Resultados", () => {
    cy.visit("https://anydice.com/");
    cy.get("#codeInput").clear().type(`output 2d6 + 3 named "espadas curtas"`);
    cy.get("#calculateButton").click();
    cy.wait(1000);
    cy.get("#exportDisplay-selector").click();
    cy.wait(1000);
    cy.get("#exportDisplay > textarea").should("contain.text", "espadas curtas");
  });
});

const testFunction = `function: pokerole N dice {
  SUCCESSES: [count {{}4, 5, 6} in Nd6]
  result: SUCCESSES
 }
   
 loop N over {{}1..10} {
  output [pokerole N dice] named "[N]d"
 }`;