import { Todos } from "./collections";

Meteor.methods({
  addTodo: function (data) {
    return Todos.insert(data);
  },
  deleteTodo: function (query) {
    query.userId = Meteor.userId();
    return Todos.remove(query);
  },
  deleteTodos: function () {
    return Todos.remove({ userId: Meteor.userId() });
  },
});
