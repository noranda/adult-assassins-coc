import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-sm-2', 'attacker'],

  attack: null,

  playerName: Ember.computed.oneWay('attack.attacker.player.name'),
  stars: Ember.computed.oneWay('attack.score'),
  calledAttack: Ember.computed.equal('stars', null)
});
