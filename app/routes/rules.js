import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  afterModel: function() {
    if (Ember.isEmpty(this.controllerFor('rules').get('model'))) {
      return Ember.$.get('/assets/clan_rules.md').then((rules) => {
        this.controllerFor('rules').set('model', rules);
      });
    }
  }
});
