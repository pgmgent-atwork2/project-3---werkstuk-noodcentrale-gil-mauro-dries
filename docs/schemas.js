export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      user_meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      Role: {
        $ref: '#/components/schemas/Role',
      },
    },
    example: {
      email: 'Dries@cooil.be',
      password: 'Dhondtieeee',
      user_meta: {
        firstname: 'kortrijksesteenweg',
        lastname: '9800',
        GSM: 'Deinze',
        avatar: 'http://'
      },
    },
    role: {
      label: 'admin',
    },
  },
  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      GSM: { type: 'string' },
      avatar: { type: 'string' },
    },
  },
  Role: {
    properties: {
      id: { type: 'number' },
      label: {
        type: 'string',
        enum: [
          'admin',
          'medisch',
          'functioneel-directeur',
          'ploegleiders',
          'deskundigen',
        ],
      },
    },
  },
};
