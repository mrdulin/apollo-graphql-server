const resolvers = {
  Book: {
    comments: (book, args, { services }) => {
      return services.Comment.getByBookId(book.id);
    },
    author: (book, args, { services }) => {
      return services.User.findById(book.authorId);
    }
  },
  Query: {
    books: (_, args, { services }) => {
      return services.Book.getAll();
    },
    bookById: (_, { id }, { services }) => {
      return services.Book.getById(id);
    }
  },
  Mutation: {
    addBook: (_, { book }, { services }) => {
      return services.Book.create(book);
    }
  }
};

module.exports = resolvers;
