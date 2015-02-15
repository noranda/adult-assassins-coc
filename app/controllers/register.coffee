`import Ember from 'ember'`

RegisterController = Ember.Controller.extend(
  errors: []
  firstName: null
  lastName: null
  username: null
  email: null
  password: null
  passwordConfirmation: null

  actions: {
    register: ->
      # wipe any previous errors
      @set('errors', [])

      # create the user in the store with the fields from the controller
      user = @store.createRecord('user', {
        firstName: @get('firstName')
        lastName: @get('lastName')
        username: @get('username')
        email: @get('email')
        password: @get('password')
        passwordConfirmation: @get('passwordConfirmation')
      })

      # make the AJAX call to save the user object to the database
      # then() will be triggered upon success, catch() upon failure
      user.save().then(=>
        # clear the form once the user registers, prevents their password
        # from sitting in memory once they register
        @send('resetForm')

        # transtion to the log in form, notifying them that they have registered
        @transitionTo('sessions.new', queryParams: { registrationSuccessful: true })
      ).catch((e) =>
        # sets the errors to be the return value from Rails
        # weirdly, Ember formats e.errors to be a hash: { 0: 'msg', ... }
        # Ember.keys() will return only the keys in the hash, and map()
        # is used to transform the hash into an array of its values
        @set('errors', Ember.keys(e.errors).map((key) -> e.errors[key]))
      )
      return

    resetForm: ->
      # resets all fields
      @set('firstName', null)
      @set('lastName', null)
      @set('username', null)
      @set('email', null)
      @set('password', null)
      @set('passwordConfirmation', null)
      return
  }
)

`export default RegisterController`
