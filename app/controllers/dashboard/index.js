import Ember from 'ember';

var { moment } = window;

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.oneWay('controllers.application.currentUser'),

  currentWarTimer: null,

  currentWar: function() {
    var wars = this.get('model');
    return wars.sortBy('startDate')[0];
  }.property('model.[]'),

  isInWar: function() {
    return Ember.getWithDefault(this, 'currentWar.isOngoing', false);
  }.property('currentWar.isOngoing'),

  warEnded: function() {
    return Ember.getWithDefault(this, 'currentWar.isFinished', false);
  }.property('currentWar.isFinished'),

  warResult: function() {
    return (this.get('warEnded') ? this.get('aaScore') > this.get('opScore') ? 'Victory' : this.get('aaScore') === this.get('opScore') ? 'Tie' : 'Defeat' : null);
  }.property('warEnded'),

  runTimer: function() {
    return Ember.run.later(this, function() {
      var difference;
      difference = moment().diff(this.get('endTime'));
      this.set('currentWarTimer', this.get('currentWarTimer') - difference);
      if (this.get('currentWarTimer') <= 0) {
        this.set('currentWarTimer', null);
        return this.set('warEnded', true);
      }
      // } else {
      //   // return runTimer();
      // }
    }, 1000);
  },

  displayTimer: (function() {
    return `${this.get('currentWarTimer').format('H')} hours ${this.get('currentWarTimer').format('m')} minutes`;
  }).property('currentWarTimer'),

  actions: {
    setTimer: function(warObj, hours, minutes) {
      var currentTime;
      var currentWarTimer;
      var endTime;

      currentTime = moment();
      endTime = currentTime.add(hours, 'h').add(minutes, 'm');
      currentWarTimer = endTime - currentTime;
      warObj.endTime.save();
      // return runTimer();
    }
  }
});
