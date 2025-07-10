import "./todos.html";
import { Random } from "meteor/random";
import { Todos } from "../../../api/todos/collections";

Template.todos.helpers({
  getTodos: function () {
    return Todos.find({ userId: Meteor.userId() });
  },
});

Template.todos.events({
  "submit .todo-form": function (event, template) {
    event.preventDefault();

    let title = document.querySelector(".title").value;
    let isPrivate = document.querySelector(".private").checked;

    let newTodo = {
      _id: Random.id(),
      title,
      isPrivate,
      userId: Meteor.userId(),
    };

    if (title) {
      let result = Todos.insert(newTodo);
    }
    document.querySelector(".title").value = "";
    document.querySelector(".private").checked = false;
  },
  "click .delete-btn": function (event, template) {
    Todos.remove({ _id: this._id });
  },
});
