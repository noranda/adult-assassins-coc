import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  resetController: function(controller, isExiting/*, transition */) {
    if (isExiting) {
      controller.setProperties({
        firstName: null,
        lastName: null,
        username: null,
        email: null,
        password: null,
        passwordConfirmation: null
      });
    }
  }
});
