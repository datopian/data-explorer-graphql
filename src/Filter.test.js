import { render, screen, waitForElementToBeRemoved, cleanup, fireEvent } from "@testing-library/react";
import user from '@testing-library/user-event'
import Filter from './Filter';
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { args } from './args';

const root = document.getElementById('root');

const client = new ApolloClient({
  uri: "https://data-api.energidataservice.dk/v1/graphql",
  cache: new InMemoryCache(),
});


describe("Filter Component", ()=>{
  beforeEach(()=>{
    const setFilter = jest.fn()
    render(
      <ApolloProvider client={client}>
        <Filter {...args} setFilter={setFilter} />
      </ApolloProvider>
    );
  })
  afterEach(cleanup)

  it("if all fields are available", async ()=> {
    await waitForElementToBeRemoved(() => screen.getAllByText(/Loading.../i)[0]);
    expect(screen.getByTestId(/agg/i)).toBeInTheDocument()
    expect(screen.getByTestId(/all-fields/i)).toBeInTheDocument()
    expect(screen.getByTestId(/field-container/i)).toBeInTheDocument()
    expect(screen.getByTestId(/data-ord/i)).toBeInTheDocument()

  });

  it("adding of search fields",()=> {
    const add = screen.getByTestId(/add/i)
    user.click(add)
    expect(screen.getAllByText(/\+/i).length).toBe(2);
  });

  it("adding and deleting of search field", ()=> {
    const add = screen.getByTestId(/add/i)
    user.click(add)
    expect(screen.getAllByText(/\+/i).length).toBe(2);
    user.click(screen.getAllByText(/-/i)[1])
    expect(screen.getAllByText(/\+/i).length).toBe(1);
  });

  it("should select a schema field and filled with value", async ()=>{
    fireEvent.change(screen.getByTestId('field'), { target: { value: "ConnectedArea" } })
    const select = screen.getByTestId('field');
    expect(select.value).toBe('ConnectedArea');

    await user.type(screen.getByTestId('field-value'), 'DK2')

    expect(screen.getByTestId('field-value').value).toBe('DK2')

    user.click(screen.getByText(/filter/i))

  })

  it("should fill in the right logic", async ()=>{
    fireEvent.change(screen.getByTestId('field'), { target: { value: "ConnectedArea" } })
    const select = screen.getByTestId('field');
    expect(select.value).toBe('ConnectedArea');

    fireEvent.change(screen.getByTestId('logic'), { target: { value: "_neq" } })
    const logic = screen.getByTestId('logic');
    expect(logic.value).toBe('_neq');

    await user.type(screen.getByTestId('field-value'), 'DK1')

    expect(screen.getByTestId('field-value').value).toBe('DK1')

    user.click(screen.getByText(/filter/i))

  })

  it("should select the right order", async ()=>{
    fireEvent.change(screen.getByTestId('field'), { target: { value: "ConnectedArea" } })
    const select = screen.getByTestId('field');
    expect(select.value).toBe('ConnectedArea');

    fireEvent.change(screen.getByTestId('logic'), { target: { value: "_neq" } })
    const logic = screen.getByTestId('logic');
    expect(logic.value).toBe('_neq');

    await user.type(screen.getByTestId('field-value'), 'DK1')

    expect(screen.getByTestId('field-value').value).toBe('DK1')

    fireEvent.change(screen.getByTestId('ord-type'), { target: { value: "desc" } })
    const order = screen.getByTestId('ord-type');
    expect(order.value).toBe('desc');

    user.click(screen.getByText(/filter/i))

  })


});


