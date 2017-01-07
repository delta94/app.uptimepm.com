import gql from 'graphql-tag';

export const SAVE_CLIENT = gql`
  mutation saveClient($client: ClientInput!) {
    saveClient(client: $client) {
      id
      name
      loginDomain
      website
    }
  }
`;
