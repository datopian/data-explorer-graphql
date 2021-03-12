import { render, cleanup, act, screen } from "@testing-library/react";
import TableContainer from "./TableContainer";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { args } from "./args";

jest.setTimeout(100000);
const client = new ApolloClient({
  uri: "https://data-api.energidataservice.dk/v1/graphql",
  cache: new InMemoryCache(),
});

afterEach(cleanup);

test("renders learn react link", async () => {
  const { dataset, schema } = args;
  const filter = {};
  const total = 0;
  const offset = 0;

  act(() => {
    render(
      <ApolloProvider client={client}>
        <TableContainer
          dataset={dataset}
          schema={schema}
          filter={filter}
          total={total}
          offset={offset}
        ></TableContainer>
      </ApolloProvider>
    );
  });
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});
