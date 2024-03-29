import gql from "graphql-tag";

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      username
      role
    }
  }
`;
