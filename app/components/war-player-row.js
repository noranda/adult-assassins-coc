import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.Component.extend ({
  classNames: ['row', 'war-player-row'],
  warPlayer: null,

  formElementId: function() {
    return `position-${this.get('warPlayer.position')}`;
  }.property('warPlayer.position'),

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
      // var attacker = this.
    }
  }
});
