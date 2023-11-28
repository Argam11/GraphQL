import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games.map((g) => {
        const ratingList = db.reviews.filter((r) => r.game_id === g.id).map((r) => r.rating);

        const averageRating = (ratingList.reduce((a, b) => a + b) / ratingList.length).toFixed(1);

        return { ...g, averageRating };
      });
    },
    game(_, args) {
      const game = db.games.find((game) => game.id === args.id);

      const ratingList = db.reviews.filter((r) => r.game_id === args.id).map((r) => r.rating);

      const averageRating = (ratingList.reduce((a, b) => a + b) / ratingList.length).toFixed(1);

      return { ...game, averageRating };
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      const author = db.authors.find((a) => a.id === parent.author_id);
      author.reviews = db.reviews.filter((r) => r.author_id === parent.author_id);;

      return author;
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    addGame(_, { input: { title, platforms, reviews } }) {
      const game = { id: String(Number(db.games.at(-1).id) + 1), title, platforms };
      const review = { id: String(Number(db.reviews.at(-1).id) + 1), game_id: game.id, ...reviews };

      db.games.push(game);
      db.reviews.push(review);

      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.game };
        }

        return g;
      });

      return db.games.find((g) => g.id === args.id);
    },
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);

      return db.games;
    },
  },
};

export default resolvers;
