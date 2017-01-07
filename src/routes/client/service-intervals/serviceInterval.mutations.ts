import gql from 'graphql-tag';

export const SAVE_SERVICE_INTERVAL = gql`
  mutation saveServiceInterval($serviceInterval: ServiceIntervalInput!) {
    saveServiceInterval(serviceInterval: $serviceInterval) {
      id
      client
      title
      operatingHours
      initialService
    }
  }
`;
