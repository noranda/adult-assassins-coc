import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.computed.oneWay('session.currentUser')
});
