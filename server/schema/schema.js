import graphql from 'graphql';
import _ from 'lodash';
import Author from '../models/author.js';
import Book from '../models/book.js';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// dummy data

// const books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "66056fd753591126483e0126" },
//   { name: "The Final Empire", genre: "Fantasy", authorId: "66056fe353591126483e0128" },
//   { name: "The Long Earth", genre: "Sci-Fi", authorId: "66056fec53591126483e012a" },
//   { name: "The Hero of Ages", genre: "Fantasy", authorId: "66056fe353591126483e0128" },
//   { name: "The Colour of Magic", genre: "Fantasy", authorId: "66056fec53591126483e012a" },
//   { name: "The Light Fantastic", genre: "Fantasy", authorId: "66056fec53591126483e012a" },
// ]

// const authors = [
//   { name: 'Patrick', age: 44, id: '1' },
//   { name: 'Brandon', age: 42, id: '2' },
//   { name: 'Terry', age: 66, id: '3' }
// ]

const BookType = new GraphQLObjectType({
  name: 'Book',
  // we are using a function here because we are using a closure to avoid reference error of AuthorType
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
        return Book.find({ authorId: parent.id });
      }
    }
  }),
});

// How do we intially get into the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    book: {
      type: BookType,
      // I want the user to pass along an id, so that I can fetch the required book detail
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to data from database or other source

        // console.log(typeof(args.id)) -> GraphQLID -> converted to id
        // return _.find(books, { id: args.id })
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

export default schema;