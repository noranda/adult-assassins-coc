import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  active: function() {
    return this.get('childViews.firstObject.active');
  }.property('childViews.firstObject.active')
});
