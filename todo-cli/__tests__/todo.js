/* eslint-disable quotes */
/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test todo yesterday",
      completed: false,
      duedate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    add({
      title: "Test todo tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo2",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const todoItemsCount = overdue().length;
    add({
      title: "Test todo1 yesterday",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0],
    });
    expect(overdue().length).toBe(todoItemsCount + 1);
  });

  test("Should retrieve dueToday items", () => {
    const todoItemsCount = dueToday().length;
    add({
      title: "Test todo1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(dueToday().length).toBe(todoItemsCount + 1);
  });

  test("Should retrieve dueLater items", () => {
    const todoItemsCount = dueLater().length;
    add({
      title: "Test todo1 tomorrow",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0],
    });
    expect(dueLater().length).toBe(todoItemsCount + 1);
  });
});
