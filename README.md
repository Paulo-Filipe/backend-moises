![Moises](https://studio.moises.ai/assets/images/moises-logo-white.svg)

# Backend developer application guide

## Build a GraphQL API: CRUD and Caching

Welcome to the guide for applying as a backend developer! In this document, you'll find instructions on how to build a GraphQL API with essential features like CRUD operations and caching.

### Get started

Run 
```sh 
npm i
docker compose up
```

### Prerequisites

- Use knex to query builder
- Use **Redis** for caching (add to docker-compose)
- Use Apollo sandbox to run queries (leave queries organized so we can run them live)

### Functional Prerequisites

1. We expect all resolvers to be implemented (use pre-defined types on **schema.graphql** to guide)
    - Define resolvers to query for user (sorted playlists by name) ✓
    - Define resolvers to query for songs (sorted by name) ✓
    - Define resolvers to query for playlists (sorted by name) ✓
    - Define mutation to add/remove song ✓
    - Define mutation to add/remove playlist ✓
    - Define mutation to add/remove song from playlist ✓
    - Define mutation to update user ✓
    
2. Implement a **Cache-Aside strategy**
   * Lazy Loading: The query User should be fully cached through Lazy Loading (Implement availability with _cache hit_ and _cache miss_)
      - Ensure the cache invalidation when changes occur in user email only (✓ update cache on every change)
      - E.g., query User
        
      ```
      query Query($userId: ID!) {
        user(id: $userId) {
          id
          email
          name
          playlists {
            id
            name
            songs {
              id
              name
            }
          }
          songs {
            id
            name
          }
        }
      }
      ```

   * Write Through - reverse the order of how the cache is populated (only after lazy loading)
      + Should change the cache first and then the Postgres, apply on the following mutations:
          - add / remove songs for a user ✓
          - add / remove songs for a playlist ✓
          - add / remove playlists for a user ✓
      + Keep cache lists sorted ✓
      
3. PLUS: Write integration tests for resolvers, mutations and cache (parcially done)


### How to Share Your Work
When you're ready to share your completed application, follow these steps:

1. Fork and Commit: Fork this repository and commit your developed code to the new forked repository.
2. GitHub Repository: Push your forked repository to your GitHub account.
3. Share the Link: Once your code is on GitHub, share the repository link with us. This will enable us to review your application effectively.


### My comments on the test
Very interesting task. I will provide some explanations regarding the decisions I made:

01. The initial decision was whether to create DAOs to manage both the Database and Cache Access. Normally, in a real context similar to this, I would have opted for this approach. However, it seemed like an overkill for this project. Therefore, I decided to centralize this functionality within the controller objects.

02. I faced a similar choice when considering whether to introduce a service layer to the system, preventing direct access to the database/cache by the controller. Once again, it seemed like overengineering. Ordinarily, I would have implemented this layer as well.

03. I encountered some difficulties while setting up the testing environment (Mocha library didn't wait for the server to be ready, resulting in consistent 404 errors). Consequently, my progress with tests was limited. I could run tests using `docker-compose up` and subsequently execute tests in a separate terminal.

04. I aimed to maintain a similar project structure as the base project, but I would have preferred using objects like classes to enhance unit testing.

If I had more time, there are several improvements I would implement:
- Error handling: Currently, the error handling is quite rudimentary and not very secure.
- Centralization of configurations and environmental variables into a single object.
- Establishment of a default user for integration testing purposes.
- Implementation of insightful logs to improve observability (I didn't invest extensive effort in this aspect, as I found it less pertinent for a straightforward system. Once more, aiming to steer clear of overengineering).
- Use of Typescript.
