import "./todoDetails.html";
import { Todos, Todos_Images } from "../../../api/todos/collections";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.todoDetails.onCreated(function () {
  this.todoId = new ReactiveVar();

  this.autorun(() => {
    FlowRouter.watchPathChange();
    this.todoId.set(FlowRouter.getParam("_id"));
  });

  this.autorun(() => {
    let query = { _id: this.todoId.get() };
    this.subscribe("getTodo", query);
  });
});

Template.todoDetails.helpers({
  currentTodo() {
    return Todos.findOne({ _id: Template.instance().todoId.get() });
  },
  getImg() {
    return Todos_Images.findOne({
      "meta.todoId": Template.instance().todoId.get(),
    })?.link();
  },
});
