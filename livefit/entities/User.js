const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "USERS",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: varchar(50),
      nullable: false,
      unique: true,
    },
    email: {
      type: varchar(320),
      nullable: false,
      unique: true,
    },
    role: {
      type: varchar(20),
      unique: true,
    },
  },
});
