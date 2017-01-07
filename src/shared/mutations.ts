import gql from 'graphql-tag';
export const DELETE_ENTITY = gql`
  mutation delete($id: String!) {
    delete(id: $id)
  }
`;
