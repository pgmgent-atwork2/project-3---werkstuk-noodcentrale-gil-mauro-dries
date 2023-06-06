import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Category',
  tableName: 'categories',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    Name: {
      type: 'varchar',
    },
  },
  relations: {
    role: {
      type: 'many-to-many',
      target: 'Role',
      joinTable: {
        name: 'roles_has_categories',
        joinColumns: [{ name: 'id_category', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'id_role', referencedColumnName: 'id' }],
      },
    },
  },
});
