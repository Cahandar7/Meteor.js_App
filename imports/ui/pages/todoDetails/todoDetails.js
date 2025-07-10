import "./todoDetails.html";
import { Todos } from "../../../api/todos/collections";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.todoDetails.onCreated(function () {
  this.todoId = new ReactiveVar();

  this.autorun(() => {
    this.todoId.set(FlowRouter.getParam("_id"));
  });
});

Template.todoDetails.helpers({
  currentTodo() {
    return Todos.findOne({ _id: Template.instance().todoId.get() });
  },
});
