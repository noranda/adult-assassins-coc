import Ember from 'ember';

export default Ember.Controller.extend({
  errors: [],

  war: Ember.computed.oneWay('model.war'),
  warPlayer: Ember.computed.oneWay('model.warPlayer'),

  selectedWarPlayer: null,
  selectedScore: null,

  scores: function() {
    var scores = [];

    scores.push({ value: null, name: 'N/A' });
    scores.push({ value: 1, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star-o fa-fw"></i><i class="fa fa-star-o fa-fw"></i>') });
    scores.push({ value: 2, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i><i class="fa fa-star-o fa-fw"></i>') });
    scores.push({ value: 3, name: Ember.String.htmlSafe('<i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i><i class="fa fa-star fa-fw"></i>') });

    return scores;
  }.property(),

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
