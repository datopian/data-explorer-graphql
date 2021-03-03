import { render, screen, waitForElementToBeRemoved, cleanup, fireEvent } from "@testing-library/react";
import user from '@testing-library/user-event'
import App from "./App";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { args } from './args';

jest.setTimeout(100000)
const client = new ApolloClient({
  uri: "https://data-api.energidataservice.dk/v1/graphql",
  cache: new InMemoryCache(),
});

afterEach(cleanup)
beforeAll(()=>{
  render(
    <ApolloProvider client={client}>
      <App {...args} />
    </ApolloProvider>
  );
})
test("renders learn react link", async () => {
  
  const linkElement = screen.getByTestId(/hidden-test/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getAllByText('Loading...')[0]).toBeInTheDocument();

  // await waitForElementToBeRemoved(() => screen.getAllByText(/Loading.../i)[0]);
  await waitForElementToBeRemoved(() => screen.getAllByText(/Loading.../i)[1]);

  expect(screen.getByTestId(/agg/i)).toBeInTheDocument()
  expect(screen.getByTestId(/all-fields/i)).toBeInTheDocument()
  expect(screen.getByTestId(/field-container/i)).toBeInTheDocument()  

});

