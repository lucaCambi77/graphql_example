const {ApolloServer, gql} = require('apollo-server');
const axios = require('axios');
const express = require("express");

const app1 = express();
const app2 = express();

const posts = [
    {
        id: 1,
        title: "Post 1",
        user: "user1",
        comments: [1, 2]
    },
    {
        id: 2,
        title: "Post 2",
        user: "user2",
        comments: [3]
    }
]

const comments = [
    {
        id: 1,
        postId: 1,
        user: "user3",
        comment: "Well Done!",
    },
    {
        id: 3,
        postId: 2,
        user: "user4",
        comment: "Very very well!",
    },
    {
        id: 2,
        postId: 1,
        user: "user5",
        comment: "Dont' dig it!",
    }
]


app1.get("/posts", (req, res) => res.send(posts));
app2.get("/comments", (req, res) => {
    const {postId} = req.query;

    if (postId) {
        const filteredComments = comments.filter(comment => comment.postId === parseInt(postId));
        return res.json(filteredComments);
    }

    res.json(comments);
});

const PORT1 = 8080;
const PORT2 = 8081;

app1.listen(PORT1, () => console.log(`Server 1 running on port ${PORT1}`));
app2.listen(PORT2, () => console.log(`Server 2 running on port ${PORT2}`));


// Define your GraphQL schema
const typeDefs = gql`
  type Post {
    id: Int
    title: String
    user: String
    comments: [Comment]
  }

  type Comment {
    postId : Int
    user: String
    comment: String
  }

  type Query {
    posts: [Post]
    comments: [Comment]
  }
`;

// Define resolvers
const resolvers = {
    Query: {
        posts: async () => {
            // Fetch product data from the product API
            const response = await axios.get('http://localhost:8080/posts'); // Post API
            return response.data;
        },
        comments: async () => {
            // Fetch category data from the category API
            const response = await axios.get('http://localhost:8081/comments'); // Comment API
            return response.data;
        },
    },
    Post: {
        comments: async (post) => {
            const comments = await axios.get('http://localhost:8081/comments?postId=' + post.id);
            return comments.data;
        }
    }
};

// Set up Apollo Server with the schema and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen(4000).then(() => {
    console.log('Apollo server is running on http://localhost:4000');
});
