Meteor.methods({
  addUser: function (data) {
    let result = Accounts.createUser(data);
    return result;
  },
});
