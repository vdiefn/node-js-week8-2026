const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Skill",
  tableName: "SKILL",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      penerated: "uuid",
    },
    name: {
      type: varchar(50),
      nullable: false,
      unique: true,
    },
  },
});
