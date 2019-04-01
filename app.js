require('dotenv').config()

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');


const app = express();

mongoose.connect(process.env.DB, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const PORT = 5000;

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${PORT}`);
});