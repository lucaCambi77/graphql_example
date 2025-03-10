const {gql} = require('apollo-server');
const axios = require('axios');

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

// Define your GraphQL schema (SDL)
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

module.exports = { typeDefs , resolvers};