import gql from "graphql-tag";

export const GETUSERS = gql`
  query {
    getUsers {
      id
      username
      role
    }
  }
`;

export const GETUSER = gql`
  query($id: Int, $username: String, $role: String) {
    getUser(id: $id, username: $username, role: $role) {
      id
      username
      role
    }
  }
`;

export const REMOVEUSER = gql`
  mutation($id: Int) {
    removeUser(id: $id) {
      id
    }
  }
`;

export const UPDATEUSER = gql`
  mutation($id: Int, $username: String!, $password: String!, $role: String) {
    updateUser(id: $id, username: $username, password: $password, role: $role) {
      id
    }
  }
`;

export const SIGNUP = gql`
  mutation($id: Int, $username: String!, $password: String!, $role: String) {
    signup(id: $id, username: $username, password: $password, role: $role) {
      token
    }
  }
`;
