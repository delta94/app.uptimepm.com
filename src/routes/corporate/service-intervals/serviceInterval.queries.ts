import gql from 'graphql-tag';
export const GET_SERVICE_INTERVALS = gql`
  query serviceIntervals($skip: Int!, $pageSize: Int!, $searchText: String) {
    serviceIntervals(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      serviceIntervals {
        id
        client {
          id
          name
        }
        title
        operatingHours
        initialService
      }
      totalRows
    }
  }
`;

export const GET_SERVICE_INTERVAL_BY_ID = gql`
  query serviceIntervalById($id: String!) {
    serviceIntervalById(id: $id) {
      id
      client {
        id
        name
      }
      title
      operatingHours
      initialService
    }
  }
`;
