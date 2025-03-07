const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Define your GraphQL schema
const typeDefs = gql`
  type Product {
    id: Int
    name: String
    category: Category
  }

  type Category {
    id: Int
    name: String
  }

  type Query {
    products: [Product]
    categories: [Category]
  }
`;

// Define resolvers
const resolvers = {
    Query: {
        products: async () => {
            // Fetch product data from the product API
            const response = await axios.get('http://localhost:8080/products'); // Product API
            return response.data;
        },
        categories: async () => {
            // Fetch category data from the category API
            const response = await axios.get('http://localhost:8081/categories'); // Category API
            return response.data;
        },
    },
    Product: {
        category: async (product) => {
            // For each product, fetch the category by categoryId (resolve foreign key)
            const categories = await axios.get('http://localhost:8081/categories');
            return categories.data.find(category => category.id === product.categoryId);
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
