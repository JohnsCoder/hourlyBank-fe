import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $userId: String!
    $title: String!
    $dateStart: String!
    $dateFinish: String!
    $currency: String!
    $price: Float!
    $description: String!
  ) {
    CreateProject(
      userId: $userId
      title: $title
      dateStart: $dateStart
      dateFinish: $dateFinish
      description: $description
      currency: $currency
      price: $price
    ) {
      message

      status
    }
  }
`;

const GET_PROJECT = gql`
  query GetProjects($userId: String!) {
    GetProjects(userId: $userId) {
      __typename
      ... on Projects {
        projects {
          id
          title
          dateStart
          dateFinish
          description
          price
          currency
          finished
          daily {
            hour
            day
            todo
          }
        }
      }
      ... on Message {
        message

        status
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: String!, $hour: Float!, $todo: String!) {
    UpdateProject(id: $id, hour: $hour, todo: $todo) {
      message

      status
    }
  }
`;
const FINISH_PROJECT = gql`
  mutation FinishProject($id: String!) {
    FinishProject(id: $id) {
      message

      status
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    DeleteProject(id: $id) {
      message
      status
    }
  }
`;

export {
  CREATE_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  FINISH_PROJECT,
  DELETE_PROJECT,
};
