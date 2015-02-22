import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  hasEmptyName: Ember.computed.empty('name'),
  normalizedName: function() {
    return (this.get('name') || '').toLowerCase();
  }.property('name')
});
