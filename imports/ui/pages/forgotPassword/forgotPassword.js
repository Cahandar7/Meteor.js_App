import "./forgotPassword.html";

Template.forgot_password.helpers({});

Template.forgot_password.events({
  "submit #forgot-password": function (event, template) {
    event.preventDefault();

    let email = $("#forgot-password #exampleInputEmail1").val();

    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        console.log(err);
        alert("SOMETHING WENT WRONG");
        return;
      }
      alert("You have been sent an email");
    });
  },
});
