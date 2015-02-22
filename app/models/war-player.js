import DS from 'ember-data';

export default DS.Model.extend({
  player: DS.belongsTo('player'),
  war: DS.belongsTo('war'),
  friendly: DS.attr('boolean'),
  // attacks: DS.hasMany('attack-log'),
  position: DS.attr('number')
});
