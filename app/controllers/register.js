import Ember from 'ember';

var get = Ember.get;

export default Ember.Controller.extend({
  errors: [],
  username: null,
  email: null,
  password: null,
  passwordConfirmation: null,

  actions: {
    register: function() {
      // wipe any previous errors
      this.set('errors', []);

      // create the user in the store with the fields from the controller
      var user = this.store.createRecord('user', {
        username: this.get('username'),
        email: this.get('email'),
        password: this.get('password'),
        passwordConfirmation: this.get('passwordConfirmation')
      });

      // make the AJAX call to save the user object to the database
      // then() will be triggered upon success, catch() upon failure
      user.save().then(() => {
        // transtion to the log in form, notifying them that they have registered
        this.transitionTo('login', { queryParams: { registrationSuccessful: true } });
      }).catch((e) => {
        // sets the errors to be the return value from Rails
        // weirdly, Ember formats e.errors to be a hash: { 0: 'msg', ... }
        // Ember.keys() will return only the keys in the hash, and map()
        // is used to transform the hash into an array of its values
        var errors = get(e, 'errors') || { server: 'Unable to connect to the server, please try again' };

        this.set('errors', Ember.keys(errors).map(function(key) { return errors[key]; }));
        user.destroyRecord();
      });
    }
  }
});
