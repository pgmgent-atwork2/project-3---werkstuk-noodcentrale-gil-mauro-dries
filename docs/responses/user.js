export default {
  200: {
    description: 'succeeded',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },
};
