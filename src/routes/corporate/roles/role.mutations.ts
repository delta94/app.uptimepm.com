import gql from 'graphql-tag';

export const ADD_EDIT_ROLE = gql`
  mutation saveRole($data: RoleInput!) {
    saveRole(data: $data) {
      id
      name
      type
      scope
      permissions {
        id
        name
        privileges
      }
    }
  }
`;
