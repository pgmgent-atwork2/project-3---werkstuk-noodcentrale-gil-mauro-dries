import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
  relations: {
    meta: {
      target: 'UserMeta',
      type: 'one-to-one',
      onDelete: 'CASCADE',
      cascade: true,
      inverseSide: 'users',
    },
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'users',
    },
    feedback: {
      target: 'Feedback',
      type: 'one-to-one',
      cascade: true,
      inverseSide: 'user',
    },
  },
});
