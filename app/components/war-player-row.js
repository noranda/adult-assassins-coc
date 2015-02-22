import Ember from 'ember';

var { noty } = window;

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

      if (Ember.isEmpty(playerName) && player.get('isNew')) { return; }

      var notyError = { text: `Failed to save player ${player.get('name')}, please try again`, type: 'error' };

      this.get('warPlayer.player').save().then(() => {
        if (warPlayer.get('isNew')) {
          warPlayer.save().then(function() {
            // noty({ text: `Saved player ${player.get('name')}`, type: 'success' });
          }, function() {
            noty(notyError);
          });
        }
      }, () => {
        noty(notyError);
      });
    }
  }
});
