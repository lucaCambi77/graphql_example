const {ApolloServer} = require('apollo-server');
const express = require("express");
const {resolvers, typeDefs} = require("./apollo");
const {posts, postComments} = require("./posts");

const app1 = express();
const app2 = express();

app1.get("/posts", (req, res) => res.send(posts));
app2.get("/comments", (req, res) => {
    const {postId} = req.query;

    if (postId) {
        const filteredComments = postComments.filter(comment => comment.postId === parseInt(postId));
        return res.json(filteredComments);
    }

    res.json(postComments);
});

const PORT1 = 8080;
const PORT2 = 8081;

app1.listen(PORT1, () => console.log(`Posts Server is running on port ${PORT1}`));
app2.listen(PORT2, () => console.log(`Comments Server is running on port ${PORT2}`));


// Set up Apollo Server with the schema and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen(4000).then(() => {
    console.log('Apollo server is running on http://localhost:4000');
});
