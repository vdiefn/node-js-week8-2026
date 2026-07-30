const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
  name: "Class",
  tableName: "CLASS",
  columns: {
    id: {
      type: "uuid",
      generated: "uuid",
      primary: true,
      nullable: false
    },
    name: {
      type: "varchar",
      length: 50,
      nullable: false
    }
  }
})