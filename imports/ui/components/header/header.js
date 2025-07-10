import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "./header.html";

Template.header.helpers({
  isActive: function (path) {
    return FlowRouter.current().path === path ? "active" : "";
  },
});
