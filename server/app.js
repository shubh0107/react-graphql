const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema');
const cors = require('cors');

// allow cross origin



const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening to requests on port 4000');
});