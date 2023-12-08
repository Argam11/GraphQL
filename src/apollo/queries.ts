import { gql } from "@apollo/client";

import { ADD_GAME_FRAGMENT } from './fragments'; 

export const GET_GAMES = gql`
  query GetGames($page: Int) {
    games(page: $page) {
      data {
        ...AddGameFragment
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
  ${ADD_GAME_FRAGMENT}
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      ...AddGameFragment
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
  ${ADD_GAME_FRAGMENT}
`;
