import Ember from 'ember';

function generateTargetList(friendly) {
  return function() {
    var size = this.get('currentWar.warSize');
    var players;
    var currentWar = this.get('currentWar');
    var sortedTargets = [];
    var target;
    var player;

    if (friendly) {
      players = this.get('warAttackers');
    } else {
      players = this.get('warTargets');
    }

    for (var i = 1; i <= size; i++) {
      target = players.findBy('position', i);
      if (Ember.isNone(target)) {
        player = this.get('store').createRecord('player');
        target = this.get('store').createRecord('war-player', { position: i, friendly: friendly, player: player });
        target.set('war', currentWar);
      }

      sortedTargets.push(target);
    }

    return sortedTargets;
  };
}

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.oneWay('controllers.application.currentUser'),

  queryParams: [{ displayBy: 'display-by' }],

  wars: Ember.computed.oneWay('model.wars'),

  displayBy: 'targets',
  warTargets: Ember.computed.filterBy('currentWar.warPlayers', 'friendly', false),
  warAttackers: Ember.computed.filterBy('currentWar.warPlayers', 'friendly', true),

  isViewingTargets: Ember.computed.equal('displayBy', 'targets'),
  isViewingAttackers: Ember.computed.not('isViewingTargets'),

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

  opponentTargetList: generateTargetList(false).property('currentWar', 'currentWar.warSize'),
  attackerTargetList: generateTargetList(true).property('currentWar', 'currentWar.warSize'),

  targetList: function() {
    var displayBy = this.get('displayBy');
    if (displayBy === 'targets') {
      return this.get('opponentTargetList');
    } else {
      return this.get('attackerTargetList');
    }
  }.property('displayBy'),

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
    },

    viewClan: function(clanType) {
      this.set('displayBy', clanType);
    }
  }
});
