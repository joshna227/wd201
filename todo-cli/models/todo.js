/* eslint-disable no-undef */
"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require("sequelize");
const { Op } = Sequelize;
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const od = await Todo.overdue();
      od.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dt = await Todo.dueToday();
      dt.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dl = await Todo.dueLater();
      dl.forEach((item) => console.log(item.displayableString()));
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        await Todo.update(
          { completed: true },
          {
            // eslint-disable-next-line object-shorthand
            where: { id: id },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";

      if (this.dueDate === new Date().toISOString().slice(0, 10)) {
        return `${this.id}. ${checkbox} ${this.title}`;
      }
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
