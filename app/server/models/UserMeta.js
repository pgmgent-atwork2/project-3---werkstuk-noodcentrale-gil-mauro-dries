import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'UserMeta',
  tableName: 'user_meta',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    GSM: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    user: {
      target: 'User',
      onDelete: 'CASCADE',
      type: 'one-to-one',
      joinColumn: true,
      inverseSide: 'meta',
    },
  },
});
