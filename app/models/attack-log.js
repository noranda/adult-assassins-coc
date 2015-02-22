import DS from 'ember-data';

export default DS.Model.extend({
  attacker: DS.belongsTo('player'),
  target: DS.belongsTo('player'),
  score: DS.attr('number'),
  time: DS.attr('date')
});
