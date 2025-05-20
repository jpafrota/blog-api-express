# blog-api

This repo contains a simple blog API to CRUD users, posts, likes and comments.
It is meant as a personal project to cover the following topics that I wanted to learn/practice:

- [x] commit hooks
- [x] linters / formatters
- [ ] validation
- [ ] DTOs
- [ ] authentication
- [ ] authorization / rbac
- [ ] repositories
- [ ] unit testing / TDD

## Technologies used:

- TypeScript
- Express.js
- ESLint
- Prettier
- Husky
- Prisma ORM
- PostgreSQL
- Yarn

### Installing node and yarn

This repo uses `asdf`. Learn more about this amazing tool here: https://asdf-vm.com/

After setting up your environment with asdf and nodejs, run:

`corepack enable`
`asdf reshim nodejs`
`yarn`

Done! You've setup Node.js and Yarn.

### Starting the database

`docker compose up -d`

### Run migrations locally

`yarn prisma migrate dev`

This will already generate the Prisma client.

### Generating Prisma client

`yarn prisma generate`
