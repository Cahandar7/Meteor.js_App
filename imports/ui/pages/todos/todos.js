import "./todos.html";
import { Random } from "meteor/random";
import { Todos } from "../../../api/todos/collections";

Template.todos.onCreated(function () {
  this.autorun(() => {
    let query = { userId: Meteor.userId() };
    this.subscribe("getTodosFromServer", query);
  });
});

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
      Meteor.call("addTodo", newTodo, function (error, success) {
        if (error) {
          console.log({ error });
        } else {
          console.log({ success });
        }
      });
    }
    document.querySelector(".title").value = "";
    document.querySelector(".private").checked = false;
  },
  "click .delete-btn": function (event, template) {
    Meteor.call("deleteTodo", { _id: this._id }, (error, success) => {
      if (error) {
        console.log({ error });
      } else {
        console.log({ success });
      }
    });
  },
  "click .clear-btn": function (event, template) {
    Meteor.call("deleteTodos", (error, success) => {
      if (error) {
        console.log({ error });
      } else {
        console.log({ success });
      }
    });
  },
});
