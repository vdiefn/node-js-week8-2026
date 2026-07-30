const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
  name: "Grade",
  tableName: "GRADE",
  columns: {
    id: {
      type: "uuid",
      generated: "uuid",
      primary: true,
      nullable: false
    },
    score: {
      type: "int",
      nullable: false
    }
  },
  relations: {
    student: {
      target: "Student",
      type: "many-to-one",
      joinColumn: { name: "student_id" },
      nullable: false
    },
    subject: {
      target: "Subject",
      type: "many-to-one",
      joinColumn: { name: "subject_id"},
      nullable: false
    }
  }
})