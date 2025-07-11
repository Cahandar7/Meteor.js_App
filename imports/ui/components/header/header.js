import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "./header.html";

Template.header.onCreated(function () {
  this.path = new ReactiveVar();

  this.autorun(() => {
    FlowRouter.watchPathChange();
    this.path.set(FlowRouter.current().path);
  });
});

Template.header.helpers({
  isActive: function (path) {
    return Template.instance().path.get() === path ? "active" : "";
  },
});
