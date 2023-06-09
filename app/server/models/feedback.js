import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Feedback',
  tableName: 'feedbacks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    rating: {
      type: 'int',
    },
    feedback: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      onDelete: 'CASCADE',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
