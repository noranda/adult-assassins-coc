import DS from 'ember-data';

export default DS.Model.extend({
  attacker: DS.belongsTo('war-player'),
  target: DS.belongsTo('war-player'),
  score: DS.attr('number'),
  time: DS.attr('date')
});
