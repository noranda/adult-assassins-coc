import Ember from 'ember';
import Session from 'simple-auth/session';

// Takes two parameters: container and app
export function initialize(container) {
  Session.reopen({
    currentUser: null,

    setCurrentUser: function() {
      var userId = this.get('user_id');
      if (Ember.isEmpty(userId)) {
        this.set('currentUser', null);
      } else {
        container.lookup('store:main').find('user', userId).then((user) => {
          this.set('currentUser', user);
        });
      }
    }.observes('user_id')
  });
}

export default {
  name: 'session-current-user',
  before: 'simple-auth',
  initialize: initialize
};
