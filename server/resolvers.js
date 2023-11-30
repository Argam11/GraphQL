import fs from "fs";

const pageSize = 10;

const resolvers = {
  Query: {
    games(_, { page = 1 }) {
      const games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      const data = games.slice(pageSize * (page - 1), pageSize * page).map((g) => {
        const ratingList = reviews.filter((r) => r.game_id === g.id).map((r) => r.rating);

        if(ratingList.length) {
          const averageRating = (ratingList.reduce((a, b) => a + b, 0) / ratingList.length).toFixed(1);
  
          return { ...g, averageRating };
        }

        return g;
      });

      const paginationInfo = { total: games.length };

      return { data, paginationInfo };
    },
    game(_, args) {
      const games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      const game = games.find((game) => game.id === args.id);

      const ratingList = reviews.filter((r) => r.game_id === args.id).map((r) => r.rating);

      if(ratingList.length) {
        const averageRating = (ratingList.reduce((a, b) => a + b) / ratingList.length).toFixed(1);
  
        return { ...game, averageRating };
      }

      return game;
    },
    authors() {
      const authors = JSON.parse(fs.readFileSync('./db/authors.json', "utf8"));

      return authors;
    },
    author(_, args) {
      const authors = JSON.parse(fs.readFileSync('./db/authors.json', "utf8"));

      return authors.find((author) => author.id === args.id);
    },
    reviews() {
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      return reviews;
    },
    review(_, args) {
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      return reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      return reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      return reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      const authors = JSON.parse(fs.readFileSync('./db/authors.json', "utf8"));
      const reviews = JSON.parse(fs.readFileSync('./db/reviews.json', "utf8"));

      const author = authors.find((a) => a.id === parent.author_id);
      author.reviews = reviews.filter((r) => r.author_id === parent.author_id);

      return author;
    },
    game(parent) {
      const games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));

      return games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    addGame(_, { input }) {
      const games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));
      const game = { id: String(Number(games.at(-1).id) + 1), ...input };

      games.push(game);
      fs.writeFileSync('./db/games.json', JSON.stringify(games));

      return game;
    },
    updateGame(_, { id, input }) {
      let games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));

      games = games.map((g) => {
        if (g.id === id) {
          return { ...g, ...input };
        }

        return g;
      });

      fs.writeFileSync('./db/games.json', JSON.stringify(games));

      return games.find((g) => g.id === id);
    },
    deleteGame(_, { id }) {
      let games = JSON.parse(fs.readFileSync('./db/games.json', "utf8"));

      games = games.filter((g) => g.id !== id);

      fs.writeFileSync('./db/games.json', JSON.stringify(games));

      return games.find((g) => g.id === id);
    },
  },
};

export default resolvers;
