`import Ember from 'ember'`

ApplicationController = Ember.Controller.extend(
  currentUser: null

  # monitors the user_token and user_email fields on the session object
  # when they change this will fetch the current user model from Rails
  userObserver: (->
    if Ember.isEmpty(@get('session.user_token')) || Ember.isEmpty(@get('session.user_email'))
      @set('currentUser', null)
      return

    # because this observes two properties, this method gets fired twice
    # if they both update at once. Ember.run.once will queue the
    # call to this.fetchCurrentUser so that it is only run once
    Ember.run.once(@, @fetchCurrentUser)
  ).observes('session.user_token', 'session.user_email').on('init')

  # makes a call to /users/me, which will return the logged in user
  # then, stores that user in the ember-data store and sets
  # `currentUser` on this route
  fetchCurrentUser: ->
    Ember.$.get('/users/me').then((response) =>
      @store.pushPayload('user', response)
      @store.find('user', response.user.id).then((user) =>
        @set('currentUser', user)
      )
    )
)

`export default ApplicationController`
