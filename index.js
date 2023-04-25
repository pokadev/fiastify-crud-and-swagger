const fastify = require('fastify')({ logger: true })
const swagger = require('@fastify/swagger')
const swaggerUI = require('@fastify/swagger-ui')
const {SwaggerTheme} = require('swagger-themes')

fastify.register(swagger)

fastify.register(swaggerUI, {
  exposeRoute: true,
  routePrefix: '/docs',
  theme: {
    css: [{ filename: "theme.css", content: new SwaggerTheme("V3").getBuffer('dark') }],
  },
});

fastify.register(require("./routes/items"));

const start = async() => {
  try {
    await fastify.listen(8080);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1)
  }
}

fastify.listen(8080)


