import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query clients($skip: Int!, $pageSize: Int!, $searchText: String) {
    clients(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      clients {
        id
        name
        loginDomain
        website
      }
      totalRows
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query clientById($id: String!) {
    clientById(id: $id) {
      id
      uuid
      loginDomain
      name
      website
      phones {
        type
        digits
        extension
      }
      addresses {
        lineOne
        lineTwo
        lineThree
        city
        state
        postalCode
        country
      }
    }
  }
`;
