import gql from 'graphql-tag';

export const GET_ME = gql`
  query me {
    me {
      user {
        id
        firstName
        lastName
        email
        client {
          id
          name
        }
        roles {
          name
          permissions {
            name
            privileges
          }
        }
      }
    }
  }
`;
