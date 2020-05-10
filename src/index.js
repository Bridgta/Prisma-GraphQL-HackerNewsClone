const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            });
        },
    },
};

//schema and resolvers are bundled and passed to the GraphQLServer -which is imported from graphql-yoga
const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
});

server.start(() => console.log(`Server started`));
