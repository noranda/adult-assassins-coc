import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:devise',

  queryParams: ['registrationSuccessful'],

  identification: null,
  password: null,
  registrationSuccessful: false,
  loginFailed: false,

  actions: {
    authenticate: function() {
      // HACK: wipe the registrationSuccessful message upon log in attempt
      if (this.get('registrationSuccessful')) {
        this.set('registrationSuccessful', false);
      }

      // quickly exit and avoid the AJAX call if either the email or password is empty
      if (Ember.isEmpty(this.get('identification')) || Ember.isEmpty(this.get('password'))) {
        this.set('loginFailed', true);
        return;
      }

      // wipe the failed message and make the AJAX call to log the user in
      // this._super() is defined by ember-simple-auth in
      // the LoginControllerMixin included in this controller
      this.set('loginFailed', false);
      return this._super().catch(() => {
        // log in failed, either invalid email or password
        this.set('loginFailed', true);
      });
    }
  }
});
