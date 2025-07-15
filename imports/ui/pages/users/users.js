import "./users.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.users.helpers({
  getCurrentUser: function () {
    return Meteor.user();
  },
});

Template.users.events({
  "submit #register-form": function (event, template) {
    event.preventDefault();

    let email = $("#register-form #exampleInputEmail1").val();
    let password = $("#register-form #exampleInputPassword1").val();
    let username = $("#register-form #exampleInputUsername").val();
    let fullname = $("#register-form #exampleInputFullname").val();

    let data = {
      email,
      password,
      username,
      profile: { fullname },
    };

    Meteor.call("addUser", data, (err, success) => {
      if (err) {
        console.log(err);
      }
      if (success) {
        console.log(success);
      }
    });
  },
  "submit #login-form": function (event, template) {
    event.preventDefault();

    let username = $("#login-form #exampleInputUsername2").val();
    let password = $("#login-form #exampleInputPassword2").val();

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("Login successfully");
      FlowRouter.go("/");
    });
  },
  "submit #change-password-form": function (event, template) {
    event.preventDefault();

    let oldPassword = $("#change-password-form #exampleInputOldPassword").val();
    let newPassword = $("#change-password-form #exampleInputNewPassword").val();

    Accounts.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      alert("Password changed successfully");
      FlowRouter.go("/users");
    });
  },
});
