# Example on how to use an Apollo Server and fetch data from different Apis

## Requirements

- Nodejs

## Start the application

- `npm install`
- `node index.js`

## Data Model and Apollo

We create two different express server to simulate different databases using in memory structures
for posts and comments of a social like application example.

Posts example:

```json
{
  "id": 1,
  "title": "Some title"
}
```

Comments example:

```json
{
  "id": 1,
  "postId": [
    1
  ],
  "comment": "some comment"
}
```

After we start the application, we can query the Apollo server:

```graphql
query GetPosts {
  posts {
    id
    title
    comments {
      comment
    }
  }
}
```

This works by defining `types` and `resolvers` in the graphql schema, [view the apollo file](./apollo.js)
