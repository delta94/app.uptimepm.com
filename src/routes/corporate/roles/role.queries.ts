import gql from 'graphql-tag';

export const GET_ROLES = gql`
  query roles($skip: Int!, $pageSize: Int!, $searchText: String) {
    roles(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      payload {
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
      totalRows
    }
  }
`;

export const GET_ROLES_FOR_SELECTION = gql`
  query {
    roles(skip: 0, pageSize: 100, searchText: "") {
      payload {
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
      totalRows
    }
  }
`;

export const ROLE_PERMISSIONS = gql`
  query rolePermissions {
    rolePermissions {
      id
      name
      type
      privileges
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  query roleById($id: String!) {
    roleById(id: $id) {
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
    rolePermissions: rolePermissionsForAssignment {
      id
      name
      type
      privileges
    }
  }
`;

export const GET_ROLES_BY_TYPE = gql`
  query rolesByType($type: RoleTypeEnum!) {
    rolesByType(type: $type) {
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
