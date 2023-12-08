import { gql } from "@apollo/client";

export const ADD_GAME_FRAGMENT = gql`
  fragment AddGameFragment on Game {
    id
    title
    platforms
    averageRating
  }
`;
