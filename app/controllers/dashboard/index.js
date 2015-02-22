import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.oneWay('controllers.application.currentUser'),

  wars: Ember.computed.oneWay('model.wars'),

  warTargets: Ember.computed.filterBy('currentWar.warPlayers', 'friendly', false),
  warAttackers: Ember.computed.filterBy('currentWar.warPlayers', 'friendly', true),

  currentWar: function() {
    var wars = this.get('wars');
    return wars.sortBy('startDate')[0];
  }.property('wars.[]'),

  currentTimer: Ember.computed.oneWay('model.timers.firstObject'),

  warText: function() {
    if (Ember.isNone(this.get('currentTimer'))) {
      return 'There is peace throughout the land.';
    } else {
      return 'War is inevitable.';
    }
  }.property('currentTimer'),

  targetList: function() {
    var size = this.get('currentWar.warSize');
    var targets = this.get('warTargets');
    var currentWar = this.get('currentWar');
    var sortedTargets = [];
    var target;
    var player;

    for (var i = 1; i <= size; i++) {
      target = targets.findBy('position', i);
      if (Ember.isNone(target)) {
        player = this.get('store').createRecord('player');
        target = this.get('store').createRecord('war-player', { position: i, friendly: false, player: player });
        target.set('war', currentWar);
      }

      sortedTargets.push(target);
    }

    return sortedTargets;
  }.property('warTargets.length', 'currentWar.warSize'),

  isInWar: function() {
    return Ember.getWithDefault(this, 'currentWar.isOngoing', false);
  }.property('currentWar.isOngoing'),

  warEnded: function() {
    return Ember.getWithDefault(this, 'currentWar.isFinished', false);
  }.property('currentWar.isFinished'),

  warResult: function() {
    return (this.get('warEnded') ? this.get('aaScore') > this.get('opScore') ? 'Victory' : this.get('aaScore') === this.get('opScore') ? 'Tie' : 'Defeat' : null);
  }.property('warEnded'),

  displayTimer: (function() {
    return `${this.get('currentWarTimer').format('H')} hours ${this.get('currentWarTimer').format('m')} minutes`;
  }).property('currentWarTimer'),

  actions: {
    declareWar: function() {
      this.get('controllers.application').send('openModal', 'modals/declare-war');
    },

    scheduleWar: function() {
      this.get('controllers.application').send('openModal', 'modals/schedule-war');
    },

    makePeace: function() {
      var currentTimer = this.get('currentTimer');
      if (currentTimer && confirm('Are you sure you want to make peace? (cancels war search timer)')) {
        currentTimer.destroyRecord().catch(() => {
          currentTimer.rollback();
        });
      }
    }
  }
});
