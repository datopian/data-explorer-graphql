describe("Renders App", () => {
    it("Renders Components Correctly", () => {
        cy.visit("/")

        //Wait for data to be downloaded 
        cy.wait(4000)

        //Render Filters
        cy.get('[data-testid=all-fields]').should('exist')
        cy.get('[data-testid=field-container]').should('exist')
        cy.get('[data-testid=data-ord]').should('exist')

        //Render total Rows
        cy.get("[data-testid=agg]").should('exist')

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
        cy.wait(3000)
        cy.get(".rt-tr-group .rt-td:nth-child(3)").each(($e1) => {
            const text = $e1.text()
            if(!(text.includes("DK2") || text.includes(""))) {
                throw new Error("Filters not working correctly")
            }
        })
    })

    it("Check if reset works",() => {

        cy.get('[data-testid=agg]').then(($totalRows) => {
            const total = $totalRows.text()
            cy.get(".reset-button").click()
            cy.wait(3000)
            cy.get('[data-testid=agg]').should(($totalRowsAfter) => {
                expect($totalRowsAfter.text()).not.to.eq(total)
            })
        })
    })

    it("Check if Downloads Work", () => {
        cy.visit("/")

        cy.get(':nth-child(2) > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__year').click();
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__year').type('2021');
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__month').type('05');
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__day').type('11');

        cy.get('.react-date-picker--closed > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__year').click()
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__year').type('2021')
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__month').type('05')
        cy.get('.react-date-picker--open > .react-date-picker__wrapper > .react-date-picker__inputGroup > .react-date-picker__inputGroup__day').type('12')
        
        cy.get('.data-download-default > select').select('json')
        cy.get('.submit-button').click()

        cy.get('[data-testid=download-data]').should("be.visible").click()
        cy.wait(3000)

        cy.get('#root').attribute('data-dataset').then((res) => {
            const dataset = res
            const today = new Date()
            const dd = String(today.getDate())
            const mm = String(today.getMonth() + 1)
            const yyyy = today.getFullYear().toString()

            cy.readFile(`cypress/downloads/${dataset}_${mm}_${dd}_${yyyy}.json`, {timeout: 10000})
        })
    })

})