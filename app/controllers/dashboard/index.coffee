`import Ember from 'ember'`

{ moment } = window

DashboardController = Ember.ObjectController.extend(

  needs: ['application']

  currentUser: Ember.computed.oneWay('controllers.application.currentUser')
  currentWarTimer: null
  warEnded: false

  # determines the result of the war
  warResult: -> (
    if @get('warEnded')
      if @get('aaScore') > @get('opScore')
        "Victory"
      else if @get('aaScore') == @get('opScore')
        "Tie"
      else
        "Defeat"
    else
      null
  ).property('warEnded')

  # runs the war timer countdown
  runTimer: ->
    Ember.run.later(@, ->
      difference = moment().diff(@get('endTime'))
      @set('currentWarTimer', (@get('currentWarTimer') - difference))
      if @get('currentWarTimer') <= 0
        @set('currentWarTimer', null)
        @set('warEnded', true)
      else
        runTimer()
    , 1000)

  # displays the current war timer
  displayTimer: ( ->
    @get('currentWarTimer').format('H') + " hours " + @get('currentWarTimer').format('m') + " minutes"
  ).property('currentWarTimer')

  actions:
    setTimer: (warObj, hours, minutes) ->
      currentTime = moment()
      endTime = currentTime.add(hours, 'h').add(minutes, 'm')
      currentWarTimer = endTime - currentTime
      warObj.endTime.save()
      runTimer()
)

`export default DashboardController`
