import { gql } from "@apollo/client";

import { ADD_GAME_FRAGMENT } from './fragments'; 

export const ADD_GAME = gql`
  mutation AddGame($input: AddGameInput!) {
    addGame(input: $input) {
      ...AddGameFragment
    }
  }
  ${ADD_GAME_FRAGMENT}
`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $input: EditGameInput!) {
    updateGame(id: $id, input: $input) {
      ...AddGameFragment
    }
  }
  ${ADD_GAME_FRAGMENT}
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;
