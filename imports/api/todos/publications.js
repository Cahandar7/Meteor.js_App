import { Todos } from "./collections";

Meteor.publish({
  getTodosFromServer: function (query = {}) {
    return Todos.find(query);
  },
});
