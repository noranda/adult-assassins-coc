import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Component.extend ({
  classNames: ['row', 'war-player-row'],
  war: null,
  warPlayer: null,
  attackerList: Ember.computed.oneWay('warPlayer.defenses'),

  formElementId: function() {
    return `position-${this.get('warPlayer.position')}`;
  }.property('warPlayer.position'),

  placeholderText: function() {
    if (this.get('warPlayer.friendly')) {
      return 'friend';
    } else {
      return 'foe';
    }
  }.property('warPlayer.friendly'),

  maxStars: function() {
    var stars = this.get('warPlayer.defenses').mapBy('score').filter(function(score) { return !Ember.isNone(score); });
    if (stars.length === 0) {
      return 0;
    }

    return Math.max.apply(Math, stars);
  }.property('warPlayer.defenses.@each.score'),

  actions: {
    savePlayer: function() {
      var warPlayer = this.get('warPlayer');
      var player = warPlayer.get('player');
      var playerName = player.get('name');

      if ((Ember.isEmpty(playerName) && player.get('isNew')) || (!player.get('isNew') && !player.get('isDirty'))) { return; }

      var errorMessage = `Failed to save player ${player.get('name')}, please try again.`;
      var successMessage = `Saved player ${player.get('name')}.`;

      this.get('warPlayer.player').save().then(() => {
        if (warPlayer.get('isNew')) {
          warPlayer.save().then(function() {
            Notify.success(successMessage);
          }, function() {
            Notify.alert(errorMessage);
          });
        } else {
          Notify.success(successMessage);
        }
      }, () => {
        Notify.alert(errorMessage);
      });
    },

    addAttacker: function() {
      this.sendAction('openModal', 'modals/attacker', {
        war: this.get('war'),
        warPlayer: this.get('warPlayer')
      });
    }
  }
});
