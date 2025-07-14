import { Todos, Todos_Images } from "./collections";

Meteor.methods({
  addTodo: function (data) {
    return Todos.insert(data);
  },
  deleteTodo: function (query) {
    query.userId = Meteor.userId();
    let result = Todos.remove(query);
    if (result) {
      Todos_Images.remove({ "meta.todoId": query._id });
    }
  },
  deleteTodos: function () {
    let result = Todos.remove({ userId: Meteor.userId() });
    if (result) {
      Todos_Images.remove({});
    }
  },
});
