import Ember from 'ember';

export default Ember.Component.extend({
  stars: null,

  hasStars: function() {
    var stars = this.get('stars');
    return !Ember.isNone(stars) && stars > 0;
  }.property('stars'),

  oneStar: Ember.computed.gte('stars', 1),
  twoStar: Ember.computed.gte('stars', 2),
  threeStar: Ember.computed.equal('stars', 3)
});
