describe("Renders App", () => {
    it("Renders Components Correctly", () => {
        cy.visit("/")

        //Render Filters
        cy.get('#all-fields').should('exist')
        cy.get('#field-container').should('exist')
        cy.get('#data-ord').should('exist')

        //Render total Rows
        cy.get("#total-rows").should('exist')

        //Render Table
        cy.get(".rt-table").should('exist')

        //Render Pagination
        cy.get(".next-button").should('exist')
        cy.get(".prev-button").should('exist')
        cy.get(".page-number").should('exist')
    })

    it("Check input type to be Datepicker", () => {
        cy.get('.react-date-picker__calendar-button').click({
            multiple:true
        })
        cy.get('.react-date-picker__inputGroup').children('[type="date"]').should('not.be.visible')
    })
})