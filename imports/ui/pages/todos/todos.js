import "./todos.html";
import { Random } from "meteor/random";
import {
  Todos,
  Todos_Images,
  todoValidationContext,
} from "../../../api/todos/collections";

Template.todos.onCreated(function () {
  this.loading = new ReactiveVar(false);

  this.autorun(() => {
    let query = { userId: Meteor.userId() };
    this.subscribe("getTodos", query);
  });
});

Template.todos.helpers({
  getTodos: function () {
    return Todos.find({ userId: Meteor.userId() });
  },
  isloading: function () {
    return Template.instance().loading.get();
  },
});

Template.todos.events({
  "submit .todo-form": function (event, template) {
    event.preventDefault();

    let title = document.querySelector(".title").value;
    let isPrivate = document.querySelector(".private").checked;
    let file = document.querySelector("#todoImg").files[0];

    let newTodo = {
      _id: Random.id(),
      title,
      isPrivate,
      userId: Meteor.userId(),
    };

    if (!title) {
      alert("Input title");
      return;
    }

    todoValidationContext.reset();
    newTodo = todoValidationContext.clean(newTodo);
    todoValidationContext.validate(newTodo);
    if (!todoValidationContext.isValid()) {
      todoValidationContext.validationErrors().map((err) => console.log(err));
      return;
    }

    if (file) {
      const upload = Todos_Images.insert(
        {
          meta: {
            temp: true,
            todoId: newTodo._id,
          },
          file,
          chunkSize: "dynamic",
        },
        false
      );

      upload.on("start", function () {
        template.loading.set(true);
      });

      upload.on("end", function (error, fileObj) {
        if (error) {
          console.log(error);
          alert("Error", error);
        }
        if (fileObj) {
          if (title) {
            Meteor.call(
              "addTodo",
              { ...newTodo, imgId: fileObj._id },
              function (error, success) {
                if (error) {
                  console.log({ error });
                } else {
                  console.log({ success });
                }
              }
            );
          }
          template.loading.set(false);
        }
      });

      upload.start();
    } else {
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
    document.querySelector("#todoImg").value = "";
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
