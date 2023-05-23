import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Recording',
  tableName: 'recordings',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    time: {
      type: 'double',
    },
    telnr: {
      type: 'varchar',
    },
    language: {
      type: 'varchar',
    },
  },
  relations: {
    feedback: {
      target: 'Feedback',
      type: 'one-to-one',
      cascade: true,
      inverseSide: 'recording',
    },
    operator: {
      target: 'Operator',
      type: 'one-to-one',
      onDelete: 'CASCADE',
      joinColumn: {
        name: 'operator_id',
      },
    },
    category: {
      type: 'many-to-many',
      target: 'Category',
      joinTable: {
        name: 'recordings_has_categories',
        joinColumns: [{ name: 'id_recording', referencedColumnName: 'id' }],
        inverseJoinColumns: [
          { name: 'id_category', referencedColumnName: 'id' },
        ],
      },
    },
  },
});
