describe("Renders App", () => {
    it("Renders Components Correctly", () => {
        cy.visit("/")

        //Render Filters
        cy.get('#all-fields')
        cy.get('#field-container')
        cy.get('#data-ord')

        //Render total Rows
        cy.get("#total-rows")

        //Render Table
        cy.get(".rt-table")

        //Render Pagination
        cy.get(".next-button")
        cy.get(".last-button")
        cy.get(".page-number")
    })
})