import { gql } from "@apollo/client";

export const GET_GAMES = gql`
  query GetGames($page: Int) {
    games(page: $page) {
      data {
        id
        title
        platforms
        averageRating
        reviews {
          id
          rating
          content
          game {
            title
          }
          author {
            name
          }
        }
      }
      paginationInfo {
        total
      }
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      platforms
      averageRating
      reviews {
        id
        rating
        content
        game {
          title
        }
        author {
          name
          verified
          reviews {
            id
            rating
            content
            game {
              id
              title
            }
          }
        }
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($input: AddGameInput!) {
    addGame(input: $input) {
      id
      title
      platforms
      averageRating
    }
  }
`;

export const UPDATE_GAME = gql`
  {ADD_GAME_FRAGMENT}
  mutation UpdateGame($id: ID!, $input: EditGameInput!) {
    updateGame(id: $id, input: $input) {
      ...ADD_GAME_FRAGMENT
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;

export const ADD_GAME_FRAGMENT = gql`
  fragment AddGameFragment on Game {
    id
    title
    platforms
    averageRating
  }
`;
