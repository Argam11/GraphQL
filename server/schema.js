export const typeDefs = `#graphql
  type Query {
    games(page: Int): Games
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addGame(input: AddGameInput!): Game
    updateGame(id: ID!, input: EditGameInput): Game
    deleteGame(id: ID!): Game
  }

  type Games {
    data: [Game]!
    paginationInfo: Pagination!
  }

  type Pagination {
    total: Int!
  }

  type Game {
    id: ID!
    title: String!
    platforms: [String!]!
    reviews: [Review!]!
    averageRating: Float
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]!
  }

  input AddGameInput {
    title: String!
    platforms: [String]!
  }

  input EditGameInput {
    title: String,
    platforms: [String]
  }

  input ReviewInput {
    author_id: String!
    rating: Int!
    content: String!
  }
`;
