import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Swagger App API',
    description: 'This is a API to call HTTP methods and alter data',
    license: {
      name: 'Artevelde / Dries Dhondt',
      url: 'https://arteveldehogeschool.be',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'HTTP server',
    },
  ],
  tags: [],
  paths,
  components: {
    schemas,
  },
};
