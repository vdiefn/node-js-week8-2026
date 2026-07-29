const { EntitySchema } = require("typeorm");
const User = require("./User");
const Skill = require("./Skill");

module.exports = new EntitySchema({
  name: "Course",
  tableName: "COURSE",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    name: {
      type: varchar(100),
      nullable: false,
    },
    description: {
      description: "text",
      nullable: false,
    },
    start_at: {
      type: "timestamp",
      nullable: false,
    },
    end_at: {
      type: "timestamp",
      nullable: false,
    },
    max_participants: {
      type: "int",
      nullable: false,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
    },
    skill: {
      type: "many-to-one",
      target: "Skill",
      joinColumn: { name: "skill_id" },
    },
  },
});
