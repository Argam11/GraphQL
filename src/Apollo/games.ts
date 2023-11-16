import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
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
      platform
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
