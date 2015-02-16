import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  session: null,

  isAuthenticated: function() {
    var session = this.get('session');
    return !Ember.isNone(session) && session.get('isAuthenticated');
  }.property('session')
});
