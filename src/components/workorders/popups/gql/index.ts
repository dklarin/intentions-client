import gql from "graphql-tag";

export const GETCLIENTS = gql`
  query {
    getClients {
      clientId
      firstName
      lastName
      clientEmail
    }
  }
`;

export const ADDCLIENT = gql`
  mutation($clientId: Int, $firstName: String, $lastName: String, $clientEmail: String) {
    addClient(
      clientId: $clientId
      firstName: $firstName
      lastName: $lastName
      clientEmail: $clientEmail
    ) {
      clientId
    }
  }
`;

export const REMOVECLIENT = gql`
  mutation($clientId: Int) {
    removeClient(clientId: $clientId) {
      clientId
    }
  }
`;
