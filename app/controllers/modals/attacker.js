import Ember from 'ember';

export default Ember.Controller.extend({
  errors: [],

  war: Ember.computed.oneWay('model.war'),
  warPlayer: Ember.computed.oneWay('model.warPlayer'),

  selectedWarPlayer: null,

  modalTitle: function() {
    return `Add attacker to ${this.get('warPlayer.player.name')}`;
  }.property('warPlayer'),

  attackersList: function() {
    return this.get('war.warPlayers').filterBy('friendly', !this.get('warPlayer.friendly'));
  }.property('warPlayer', 'war'),

  actions: {
    close: function() {
      this.send('closeModal');
    }
  }
});
