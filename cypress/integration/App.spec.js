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

    it("Check if filters work", () => {
        cy.visit("/")
        cy.get('.dq-rule-add').click()

        const columnName = cy.get('[name="columnName"]').invoke('text')
        cy.log(columnName)

        cy.get('[data-testid=field-value]').clear()
        cy.get('[data-testid=field-value]').type('DK2')
        cy.get('.submit-button').click()

        cy.get(".rt-tr-group .rt-td:nth-child(3)").each(($e1, index, $list) => {
            const text = $e1.text();
            if(!(text.includes("DK2") || text.includes(""))) {
                throw new Error("Filters not working correctly")
            }
        })
    })

})