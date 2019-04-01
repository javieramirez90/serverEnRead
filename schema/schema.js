const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

let books = [
  {name: 'Peter Camenzind', genre: 'Novel', id: "1", authorId: '1'},
  {name: 'The Silmarillion', genre: 'Novel' , id: "2", authorId: '2'},
  {name: 'La insoportable levedad del ser', genre: 'Novel', id: "3", authorId: '3'},
  {name: 'La broma', genre: 'Novel', id: "4", authorId: '3'},
  {name: 'El Hobbit', genre: 'Fantasy', id: "5", authorId: '2'},
  {name: 'EL lobo estepario', genre: 'Novel', id: "6", authorId: '1'},
  {name: 'Siddhartha', genre: 'Novel', id: "7", authorId: '1'}
];

let authors = [
  {name: 'Herman Hesse', age: 85, id: "1"},
  {name: 'J.R.R. Tolkien ', age: 81 , id: "2"},
  {name: 'Milan Kundera', age: 89, id: "3"}
]


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        //code to get data db
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})