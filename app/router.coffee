`import Ember from 'ember'`
`import config from './config/environment'`

Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(->
  @resource('sessions', ->
    @route('new')
  )
  @route('login')
  @route('register')
  @route('chatroom')
  @route('rules')

  @resource('dashboard', ->
  )
)

`export default Router`
