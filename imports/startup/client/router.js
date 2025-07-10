import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import "../../ui/components/header/header";
import "../../ui/components/footer/footer";

import "../../ui/layouts/mainLayout";

import "../../ui/pages/home/home";
import "../../ui/pages/todos/todos";
import "../../ui/pages/todoDetails/todoDetails";
import "../../ui/pages/users/users";
import "../../ui/pages/notFound/notFound";

function authMiddleware(context, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect("/users");
  }
}

FlowRouter.triggers.enter([authMiddleware], {
  only: ["Todos", "TodoDetails"],
});

FlowRouter.route("/", {
  name: "Home",
  action() {
    BlazeLayout.render("mainLayout", { main: "home" });
  },
});

FlowRouter.route("/todos", {
  name: "Todos",
  action() {
    BlazeLayout.render("mainLayout", { main: "todos" });
  },
});

FlowRouter.route("/todos/:_id", {
  name: "TodoDetails",
  action() {
    BlazeLayout.render("mainLayout", { main: "todoDetails" });
  },
});

FlowRouter.route("/users", {
  name: "Users",
  action() {
    BlazeLayout.render("mainLayout", { main: "users" });
  },
});

FlowRouter.route("*", {
  action() {
    BlazeLayout.render("mainLayout", { main: "notFound" });
  },
});
