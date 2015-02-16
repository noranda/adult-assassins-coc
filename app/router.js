import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('sessions', function() {
    this.route('new');
  });
  this.route('login');
  this.route('register');
  this.route('chatroom');
  this.route('rules');

  this.resource('dashboard', function() {});
});

export default Router;
