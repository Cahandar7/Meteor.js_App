import { Todos, Todos_Images } from "./collections";

Meteor.publish({
  getTodos: function (query = {}) {
    return Todos.find(query);
  },
});

Meteor.publishComposite("getTodo", function (query = {}) {
  return {
    find() {
      return Todos.find(query);
    },
    children: [
      {
        find(todo) {
          if (todo.imgId) {
            return Todos_Images.find({ _id: todo.imgId }).cursor;
          }
        },
      },
    ],
  };
});
