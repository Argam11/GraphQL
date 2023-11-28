import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames {
    games {
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
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $input: EditGameInput!) {
    updateGame(id: $id, input: $input) {
      id
    }
  }
`;
