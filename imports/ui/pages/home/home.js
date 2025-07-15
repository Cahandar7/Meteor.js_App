import "./home.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.home.onCreated(function () {
  this.autorun(() => {
    if (!Meteor.userId()) {
      FlowRouter.go("/users");
    }
  });
});

Template.home.helpers({
  getUser: function () {
    return Meteor.user();
  },
});

Template.home.events({
  "click .logout-btn": function (event, template) {
    if (Meteor.userId()) {
      Meteor.logout(function () {
        alert("Logged out");
      });
    }
  },
});
