`import Ember from 'ember'`

{ moment } = window

DashboardController = Ember.ObjectController.extend(

  needs: ['application']

  currentUser: Ember.computed.oneWay('controllers.application.currentUser')

)

`export default DashboardController`
