import "./users.html";

Template.users.helpers({
  getUsers: function () {
    return Meteor.users.find({});
  },
  getEmails: function (emails) {
    return emails[0].address;
  },
  getCurrentUser: function () {
    return Meteor.userId();
  },
});
