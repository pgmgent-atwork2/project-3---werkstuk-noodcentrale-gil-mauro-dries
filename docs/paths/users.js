import userResponse from '../responses/user.js';

export default {
  '/users': {
    summary: 'Get all users',
    description: 'Get all users',
    get: {
      tags: ['Users'],
      summary: 'get all users',
      responses: userResponse,
    },
    post: {
      tags: ['Users'],
      summary: 'Create a user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: userResponse,
    },
    put: {
      tags: ['Users'],
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete a user',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the user to delete',
        },
      ],
      responses: userResponse,
    },
  },
  '/oneuser/{id}': {
    summary: 'Get one user with id',
    description: 'Get one user with id',
    get: {
      tags: ['Users'],
      summary: 'Get one user with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'Id of the user to get',
        },
      ],
      responses: userResponse,
    },
  },
};
