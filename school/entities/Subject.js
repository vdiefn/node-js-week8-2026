const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
  name: "Subject",
  tableName: "SUBJECT",
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
  },
  relations: {
    subject: {
      target: "Subject",
      type: "many-to-one",
    }
  }
})