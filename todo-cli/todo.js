/* eslint-disable prefer-const */
/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    od = [];
    // eslint-disable-next-line no-undef
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate < today) {
        od.push(all[i]);
      }
    }
    return od;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    dt = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate === today) {
        dt.push(all[i]);
      }
    }
    return dt;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    dl = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dueDate > today) {
        dl.push(all[i]);
      }
    }
    return dl;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    out = [];
    for (i = 0; i < list.length; i++) {
      if (list[i].dueDate === today) {
        if (list[i].completed === false) {
          out.push(`[ ] ${list[i].title}`);
        } else {
          out.push(`[x] ${list[i].title}`);
        }
      } else {
        if (list[i].completed === false) {
          out.push(`[ ] ${list[i].title} ${list[i].dueDate}`);
        } else {
          out.push(`[x] ${list[i].title} ${list[i].dueDate}`);
        }
      }
    }
    return out.join("\n");
  };

  return {
    // eslint-disable-next-line no-undef
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
