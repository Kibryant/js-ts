import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
    return { hello: 'world' }
})

server.listen({ port: 3333 }).then(() => {
    console.log('Server is running on port 3333')
})

