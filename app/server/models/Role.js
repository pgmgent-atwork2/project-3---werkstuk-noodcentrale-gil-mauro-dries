import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Role',
  tableName: 'roles',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    label: {
      type: 'varchar',
    },
  },
  relations: {
    users: {
      target: 'User',
      type: 'one-to-many',
      inverseSide: 'role',
    },

    category: {
      type: 'many-to-many',
      target: 'Category',
      joinTable: {
        name: 'categorys_has_categories',
        joinColumns: [{ name: 'id_role', referencedColumnName: 'id' }],
        inverseJoinColumns: [
          { name: 'id_category', referencedColumnName: 'id' },
        ],
      },
    },
  },
});
