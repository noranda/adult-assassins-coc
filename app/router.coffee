import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(->
  @resource('sessions', ->
    @route('new')
  )
  @route('register')

  @resource('dashboard', ->
  )
  @resource('trackers', ->
  )
)

export default Router;
