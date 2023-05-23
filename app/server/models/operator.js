import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Operator',
  tableName: 'operators',
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
    recording: {
      target: 'Recording',
      type: 'one-to-one',
      cascade: true,
      inverseSide: true,
    },
  },
});
