const graphql = require('graphql');
const_: require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

let books = [
  {name: 'Peter Camenzind', genre: 'Novel', id: '1'},
  {name: 'The Silmarillion', genre: 'Novel' , id: '2'},
  {name: 'La insoportable levedad del ser', genre: 'Novel', id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString}},
      resolve(parent, args){
        //code to get data db 
        return _.find(books, {id: args.id});
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})