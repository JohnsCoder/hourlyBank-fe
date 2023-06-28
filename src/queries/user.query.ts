import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    CreateUser(username: $username, email: $email, password: $password) {
      message
      status
    }
  }
`;

const GET_USER = gql`
  query GetUser($email: String!, $password: String!) {
    GetUser(email: $email, password: $password) {
      payload {
        tokenid
      }
      message
      status
    }
  }
`;

const AUTHENTICATE = gql`
  query Auth($token: String!) {
    Auth(token: $token) {
      message

      status
      payload {
        id
      }
    }
  }
`;

export { CREATE_USER, GET_USER, AUTHENTICATE };
